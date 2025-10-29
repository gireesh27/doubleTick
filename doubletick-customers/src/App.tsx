import { useEffect, useState, useMemo } from "react";
import { generateCustomers } from "./utils/generateData";
import CustomersTable from "./Components/CustomersTable";
import SearchBar from "./Components/SearchBar";
import FiltersDropdown from "./Components/FiltersDropDown";
import "./index.css";
import type { Customer, SortConfig } from "./types/types.ts";
import DoubleTick_Logo from "./assets/Doubletick_Logo.png";

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [displayed, setDisplayed] = useState<Customer[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [page, setPage] = useState<number>(1);

  // Generate mock customers
  useEffect(() => {
    const data = generateCustomers();
    setCustomers(data);
    setDisplayed(data.slice(0, 30));
  }, []);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.offsetHeight
      ) {
        setPage((p) => p + 1);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Filter + Sort customers (memoized)
  const filteredAndSorted = useMemo(() => {
    let filtered = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const key = sortConfig.key!;
        const valA = a[key];
        const valB = b[key];

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [customers, search, sortConfig]);

  // Reset displayed when search or sort changes
  useEffect(() => {
    setDisplayed(filteredAndSorted.slice(0, 30));
    setPage(1);
  }, [filteredAndSorted]);

  // Load more when page increases
  useEffect(() => {
    setDisplayed(filteredAndSorted.slice(0, page * 30));
  }, [page, filteredAndSorted]);

  // Handle sorting click
  const handleSort = (key: keyof Customer) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="container">
      <div className="Navbar">
        <div className="logo-section">
          <img src={DoubleTick_Logo} alt="doubletick logo" className="logo" />
        </div>
        <hr className="divider" />
      </div>
      <div className="customer-div">
        <h2 className="customer-title">
          All Customers <span className="badge">{customers.length}</span>
        </h2>
        <hr className="divider" />
      </div>
      <div className="actions">
        <SearchBar onSearch={setSearch} />
        <FiltersDropdown />
      </div>

      <CustomersTable
        data={displayed}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import type { SearchBarProps } from "../types/types.ts";
import SearchIcon from "../assets/SearchIcon.svg";

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(term.trim().toLowerCase());
    }, 250); // debounce 250ms

    return () => clearTimeout(delay);
  }, [term, onSearch]);

  return (
    <div className="search-wrapper">
      <img
        src={SearchIcon}
        alt="search"
        className="search-icon"
      />
      <input
        className="search-input"
        type="text"
        placeholder="Search Customers"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
}

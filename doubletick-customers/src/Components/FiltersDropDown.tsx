import { useState } from "react";
import Filter from "../assets/Filter.svg";

export default function FiltersDropdown() {
  const [open, setOpen] = useState(false);
  const filters = ["Filter 1", "Filter 2", "Filter 3", "Filter 4"];

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        <img src={Filter} alt="Filter" className="filter-icon" />
        Add Filters
        <span className="arrow">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          {filters.map((f) => (
            <li key={f} className="dropdown-item">
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

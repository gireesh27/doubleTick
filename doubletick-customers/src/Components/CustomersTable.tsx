import { useState } from "react";
import type { Customer, SortConfig } from "../types/types";
import user_svg from "../assets/user.svg";

interface Props {
  data: Customer[];
  onSort: (key: keyof Customer) => void;
  sortConfig: SortConfig;
}

export default function CustomersTable({ data, onSort, sortConfig }: Props) {
  //  id is number, so use Set<number>
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Format date like "Sept 12 2024, 12:45 PM"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${month} ${day} ${year}, ${time}`;
  };

  //  Toggle individual checkbox
  const toggleRow = (id: number) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
    setSelectAll(newSet.size === data.length);
  };

  // Toggle "Select All"
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(data.map((c) => c.id)));
      setSelectAll(true);
    }
  };

  return (
    <table className="customers-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </th>
          <th onClick={() => onSort("name")}>
            Customer{" "}
            {sortConfig.key === "name"
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th onClick={() => onSort("score")}>
            Score{" "}
            {sortConfig.key === "score"
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th>Email</th>
          <th onClick={() => onSort("lastMessageAt")}>
            Last message sent{" "}
            {sortConfig.key === "lastMessageAt"
              ? sortConfig.direction === "asc"
                ? "↑"
                : "↓"
              : ""}
          </th>
          <th>Added by</th>
        </tr>
      </thead>

      <tbody>
        {data.map((c) => (
          <tr
            key={c.id}
            className={`hover-row ${selectedRows.has(c.id) ? "selected-row" : ""}`}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedRows.has(c.id)}
                onChange={() => toggleRow(c.id)}
              />
            </td>
            <td className="customer-cell">
              <img src={c.avatar} alt="" className="avatar" />
              <div>
                <div className="name">{c.name}</div>
                <div className="sub">{c.phone}</div>
              </div>
            </td>
            <td>{c.score}</td>
            <td>{c.email}</td>
            <td>{formatDate(c.lastMessageAt)}</td>
            <td className="added-by">
              <img src={user_svg} alt="user" className="avatar" />
              <span className="added-by-text">{c.addedBy}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

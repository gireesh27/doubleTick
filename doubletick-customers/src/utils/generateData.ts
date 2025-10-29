import type { Customer } from "../types/types.ts";

export function generateCustomers(count = 1_000_000): Customer[] {
  const data: Customer[] = [];
  const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];
  const addedBy = ["Kartikey Mishra"];

  for (let i = 0; i < count; i++) {
    const id = i + 1;
    const name = names[Math.floor(Math.random() * names.length)];
    data.push({
      id,
      name: `${name} ${id}`,
      phone: `+91${Math.floor(9000000000 + Math.random() * 1000000000)}`,
      email: `john.doe${id}@gmail.com`,
      score: Math.floor(Math.random() * 100),
      lastMessageAt: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1,
        12,
        45
      ).toLocaleString(),
      addedBy: addedBy[Math.floor(Math.random() * addedBy.length)],
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
    });
  }
  return data;
}

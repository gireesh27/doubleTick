
export interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  score: number;
  lastMessageAt: string;
  addedBy: string;
  avatar: string;
}

export interface SortConfig {
  key: keyof Customer | null;
  direction: "asc" | "desc";
}
export interface SearchBarProps {
  onSearch: (value: string) => void;
}
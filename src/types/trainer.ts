import { Ionicons } from "@expo/vector-icons";

export interface Trainer {
  fullName: string;
  age: number | null;
  email: string;
  district: string;
  favoriteType: string;
}

export interface InfoRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}

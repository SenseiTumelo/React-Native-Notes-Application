import { Ionicons } from "@expo/vector-icons";
import { Category } from "../types";

export const CATEGORIES: Category[] = ["Work", "Study", "Personal"];

type CategoryStyle = {
  card: string;
  tag: string;
  big: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: "/work" | "/study" | "/personal";
};

export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  Work: {
    card: "bg-purple-100",
    tag: "bg-primary",
    big: "bg-primary",
    icon: "briefcase",
    route: "/work",
  },
  Study: {
    card: "bg-yellow-100",
    tag: "bg-accent",
    big: "bg-accent",
    icon: "school",
    route: "/study",
  },
  Personal: {
    card: "bg-pink-100",
    tag: "bg-pink-400",
    big: "bg-pink-400",
    icon: "person",
    route: "/personal",
  },
};
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../types";

type Props = { category?: Category };

export default function AddButton({ category }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
onPress={() => {
  console.log("add pressed", category);
  router.push({
    pathname: "/addNote",
    params: category ? { category } : {},
  });
}}
      activeOpacity={0.85}
      className="absolute bottom-28 right-6 h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg"
    >
      <Ionicons name="add" size={30} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
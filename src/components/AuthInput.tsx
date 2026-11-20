import { View, Text, TextInput, TextInputProps } from "react-native";

type Props = TextInputProps & { label: string };

export default function AuthInput({ label, ...props }: Props) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-navy">{label}</Text>
      <TextInput
        className="rounded-2xl bg-surface px-4 py-4 text-base text-navy"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        {...props}
      />
    </View>
  );
}
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#9C8FC4",
        tabBarStyle: {
          position: "absolute",
          bottom: 24,
          marginHorizontal: 20,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#1E0B4B",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="briefcase" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="school" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Home, Compass, User } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function TabsLayout() {
  const isDark = useColorScheme() === "dark";

  // Jirani palette (exact)
  const COLORS = {
    bg:   isDark ? "#0B0B0B" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#0B0B0B",
    sub:  isDark ? "#9CA3AF" : "#6B7280",
    line: isDark ? "#2A2A2A" : "#E5E7EB",
    soft: isDark ? "#151515" : "#F3F4F6",
    card: isDark ? "#111111" : "#FFFFFF",
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.sub,
        // ⬇️ Keep styling minimal so the default safe-area handling works
        tabBarStyle: {
          backgroundColor: COLORS.bg,
          borderTopColor: COLORS.line,
          borderTopWidth: 1,
        },
        // Ensure screen background fills under notches/edges correctly
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

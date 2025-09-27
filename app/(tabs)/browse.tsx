import { View, Text, useColorScheme, Platform } from "react-native";
import { Link } from "expo-router";

export default function Browse() {
  const isDark = useColorScheme() === "dark";

  const THEME = Platform.select({
    web: { bg: "var(--app-bg)", text: "var(--app-text)" },
    default: {
      bg: isDark ? "#0B0B0B" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#0B0B0B",
    },
  });

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: THEME.bg as any }}
    >
      <Text className="text-2xl font-bold" style={{ color: THEME.text as any }}>
        Browse
      </Text>

      {/* example link */}
      {/* <Link href="/(tabs)/browse" style={{ marginTop: 12, color: THEME.text as any }}>
        Browse trips
      </Link> */}
    </View>
  );
}

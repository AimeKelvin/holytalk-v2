// app/(tabs)/home.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

const LOGO = 48; // increase to 56 if you want it bigger

export default function Home() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const THEME = Platform.select({
    web: { bg: "var(--app-bg)", text: "var(--app-text)", line: "var(--app-line)" },
    default: {
      bg: isDark ? "#0B0B0B" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#0B0B0B",
      line: isDark ? "#2A2A2A" : "#E5E7EB",
    },
  });

  const logoSource = isDark
    ? require("../../assets/icons/splash-icon-light.png")
    : require("../../assets/icons/splash-icon-dark.png");

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: THEME!.bg as any }}>
      {/* Top navbar */}
      <View className="px-4 pb-2 mt-3" style={{ borderBottomWidth: 1, borderBottomColor: THEME!.line as any }}>
        <View className="h-14 flex-row items-center justify-between">
          {/* Left: bigger logo + wordmark */}
          <View className="flex-row items-center">
            <Image source={logoSource} style={{ width: LOGO, height: LOGO }} resizeMode="contain" />
            <Text style={{ marginLeft: 8, color: THEME!.text as any, fontSize: 22, fontWeight: "800" }}>
              Jirani
            </Text>
          </View>

          {/* Right: Create Trip button */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/browse")}
            activeOpacity={0.85}
            className="flex-row items-center rounded-lg"
            style={{ paddingVertical: 10, paddingHorizontal: 14, backgroundColor: THEME!.text as any }}
          > <Text style={{ marginLeft: 6, fontWeight: "700", color: isDark ? "#0B0B0B" : "#FFFFFF" }}>
              Create Trip Plan
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Page content */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold" style={{ color: THEME!.text as any }}>
          Home
        </Text>
      </View>
    </SafeAreaView>
  );
}

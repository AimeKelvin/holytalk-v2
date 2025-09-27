// app/(auth)/sign-in.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Facebook } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.35, 160);

export default function SignIn() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // monochrome palette w/ theme support
  const COLORS = {
    bg: isDark ? "#0B0B0B" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#0B0B0B",
    sub: isDark ? "#9CA3AF" : "#6B7280",
    line: isDark ? "#2A2A2A" : "#E5E7EB",
    soft: isDark ? "#151515" : "#F3F4F6",
    card: isDark ? "#111111" : "#FFFFFF",
  };

  // swap logo per theme (use your actual light/dark assets)
  const logoSource = isDark
    ? require("../../assets/icons/splash-icon-light.png")
    : require("../../assets/icons/splash-icon-dark.png");

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const onGoogle = async () => {
    try {
      setLoadingGoogle(true);
      await new Promise((r) => setTimeout(r, 600));
    } catch (e: any) {
      Alert.alert("Google sign-in failed", e?.message ?? "Try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onFacebook = async () => {
    try {
      setLoadingFacebook(true);
      await new Promise((r) => setTimeout(r, 600));
    } catch (e: any) {
      Alert.alert("Facebook sign-in failed", e?.message ?? "Try again.");
    } finally {
      setLoadingFacebook(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <Animated.View className="px-6" style={{ opacity: fade }}>
          {/* Tight logo + text header */}
          <View className="mt-14 mb-8 flex-row items-center justify-center">
            <Image
              source={logoSource}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          </View>

          <Text className="uppercase tracking-wide text-center text-[13px]" style={{ color: COLORS.sub }}>
            Welcome to Jirani
          </Text>

          <Text
            className="text-center text-[28px] font-extrabold leading-9 mt-1.5 mb-4"
            style={{ color: COLORS.text }}
          >
            Plan trips smarter with <Text style={{ color: COLORS.text }}>Jirani</Text>
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: COLORS.sub }}>
            Discover destinations, build itineraries, track budgets, and coordinate with friends — all in one place.
          </Text>

          {/* Google Button */}
          <TouchableOpacity
            onPress={onGoogle}
            activeOpacity={0.9}
            disabled={loadingGoogle}
            className="mt-6 w-full items-center justify-center rounded-full border py-3.5"
            style={{
              backgroundColor: COLORS.card,
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: isDark ? 0.15 : 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            {loadingGoogle ? (
              <ActivityIndicator color={COLORS.text} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  className="mr-2 h-5 w-5"
                  resizeMode="contain"
                />
                <Text className="text-base font-semibold" style={{ color: COLORS.text }}>
                  Continue with Google
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Facebook Button */}
          <TouchableOpacity
            onPress={onFacebook}
            activeOpacity={0.9}
            disabled={loadingFacebook}
            className="mt-3 w-full items-center justify-center rounded-full border py-3.5"
            style={{
              backgroundColor: COLORS.card,
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: isDark ? 0.15 : 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            {loadingFacebook ? (
              <ActivityIndicator color={COLORS.text} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Facebook size={20} color={COLORS.text} />
                <Text className="ml-2 text-base font-semibold" style={{ color: COLORS.text }}>
                  Continue with Facebook
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-5 flex-row items-center">
            <View className="h-[1px] flex-1" style={{ backgroundColor: COLORS.line }} />
            <Text className="mx-2" style={{ color: COLORS.sub }}>
              or
            </Text>
            <View className="h-[1px] flex-1" style={{ backgroundColor: COLORS.line }} />
          </View>

          {/* Email Button */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            className="w-full items-center rounded-2xl border py-3.5"
            style={{ backgroundColor: COLORS.soft, borderColor: COLORS.line }}
          >
            <Text className="font-bold" style={{ color: COLORS.text }}>
              Sign in with Email
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-4 items-center">
            <Text className="text-[14px]" style={{ color: COLORS.sub }}>
              New here?{" "}
              <Text
                className="font-bold"
                style={{ color: COLORS.text }}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                Create an account
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

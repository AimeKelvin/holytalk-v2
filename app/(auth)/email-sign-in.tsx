// app/(auth)/email-sign-in.tsx  (rename as you prefer)
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
  TextInput,
  Pressable,
  Dimensions,
  useColorScheme,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.35, 160);

export default function EmailSignIn() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Web => read from globals.css; Native => JS fallbacks
  const THEME = Platform.select({
    web: {
      bg: "var(--app-bg)",
      text: "var(--app-text)",
      sub: "var(--app-sub)",
      line: "var(--app-line)",
      soft: "var(--app-soft)",
      card: "var(--app-card)",
    },
    default: {
      bg: isDark ? "#0B0B0B" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#0B0B0B",
      sub: isDark ? "#9CA3AF" : "#6B7280",
      line: isDark ? "#2A2A2A" : "#E5E7EB",
      soft: isDark ? "#151515" : "#F3F4F6",
      card: isDark ? "#111111" : "#FFFFFF",
    },
  });

  // Swap logo per theme (use your actual light/dark assets)
  const logoSource = isDark
    ? require("../../assets/icons/splash-icon-light.png")
    : require("../../assets/icons/splash-icon-dark.png");

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; pw?: string }>({});
  const [focus, setFocus] = useState<{ email: boolean; pw: boolean }>({ email: false, pw: false });

  const validate = () => {
    const e: typeof errors = {};
    if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address.";
    if (pw.length < 6) e.pw = "Password must be at least 6 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      setBusy(true);
      await new Promise((r) => setTimeout(r, 800));
      Alert.alert("Success", "Signed in!");
      // router.replace("/(tabs)/home");
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: THEME.bg as any }}>
      {/* Back arrow */}
      <TouchableOpacity
        className="mt-10"
        onPress={() => router.back()}
        style={{ position: "absolute", top: 12, left: 16, zIndex: 50 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ChevronLeft size={28} strokeWidth={2.5} color={String(THEME.text)} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <Animated.View className="px-6" style={{ opacity: fade }}>
          {/* Tight logo + Jirani text */}
          <View className="mt-14 mb-8 flex-row items-center justify-center">
            <Image
              source={logoSource}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
            <Text style={{ marginLeft: 4, color: THEME.text as any, fontSize: 28, fontWeight: "800" }}>
              Jirani
            </Text>
          </View>

          {/* Copy */}
          <Text className="uppercase tracking-wide text-center text-[13px]" style={{ color: THEME.sub as any }}>
            Welcome back
          </Text>

          <Text
            className="text-center text-[28px] font-extrabold leading-9 mt-1.5 mb-4"
            style={{ color: THEME.text as any }}
          >
            Sign in with <Text style={{ color: THEME.text as any }}>Email</Text>
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: THEME.sub as any }}>
            Pick up your trips, itineraries, and budgets — right where you left off.
          </Text>

          {/* Email field */}
          <View className="mt-6">
            <Text className="mb-2 text-[13px]" style={{ color: THEME.sub as any }}>
              Email
            </Text>
            <View
              className="w-full flex-row items-center rounded-2xl border px-4 py-1.5"
              style={{
                backgroundColor: THEME.card as any,
                borderColor: (errors.email ? "#ef4444" : THEME.line) as any,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 6 },
                elevation: 2,
              }}
            >
              <Mail
                size={18}
                color={errors.email ? "#ef4444" : (focus.email ? String(THEME.text) : String(THEME.sub))}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={isDark ? "#A3A3A3" : "#8A8A8A"}
                className="ml-2 flex-1 p-3 text-[16px]"
                style={{ color: THEME.text as any }}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onFocus={() => setFocus((f) => ({ ...f, email: true }))}
                onBlur={() => setFocus((f) => ({ ...f, email: false }))}
              />
            </View>
            {errors.email && <Text className="mt-1 text-xs text-red-500">{errors.email}</Text>}
          </View>

          {/* Password field */}
          <View className="mt-4">
            <Text className="mb-2 text-[13px]" style={{ color: THEME.sub as any }}>
              Password
            </Text>
            <View
              className="w-full flex-row items-center rounded-2xl border px-4 py-1.5"
              style={{
                backgroundColor: THEME.card as any,
                borderColor: (errors.pw ? "#ef4444" : THEME.line) as any,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 6 },
                elevation: 2,
              }}
            >
              <Lock
                size={18}
                color={errors.pw ? "#ef4444" : (focus.pw ? String(THEME.text) : String(THEME.sub))}
              />
              <TextInput
                value={pw}
                onChangeText={setPw}
                placeholder="••••••••"
                placeholderTextColor={isDark ? "#A3A3A3" : "#8A8A8A"}
                className="ml-2 flex-1 p-3 text-[16px]"
                style={{ color: THEME.text as any }}
                secureTextEntry={!showPw}
                autoCapitalize="none"
                returnKeyType="done"
                onFocus={() => setFocus((f) => ({ ...f, pw: true }))}
                onBlur={() => setFocus((f) => ({ ...f, pw: false }))}
              />
              <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={8} className="pl-2">
                {showPw ? (
                  <Eye size={18} color={String(THEME.text)} />
                ) : (
                  <EyeOff size={18} color={String(THEME.sub)} />
                )}
              </Pressable>
            </View>
            {errors.pw && <Text className="mt-1 text-xs text-red-500">{errors.pw}</Text>}
          </View>

          {/* Forgot password */}
          <View className="mt-3 items-end">
            <Text className="text-[13px] font-semibold" style={{ color: THEME.text as any }}>
              Forgot password?
            </Text>
          </View>

          {/* Sign in button */}
          <TouchableOpacity
            onPress={onSubmit}
            disabled={busy}
            activeOpacity={0.9}
            className={`mt-6 w-full items-center justify-center rounded-2xl py-4 ${busy ? "opacity-80" : ""}`}
            style={{
              backgroundColor: THEME.text as any, // solid monochrome primary
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 6 },
              elevation: 3,
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            {busy ? (
              <ActivityIndicator color={isDark ? "#0B0B0B" : "#FFFFFF"} />
            ) : (
              <Text className="text-base font-semibold" style={{ color: isDark ? "#0B0B0B" : "#FFFFFF" }}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-4 items-center">
            <Text className="text-[14px]" style={{ color: THEME.sub as any }}>
              New to Jirani?{" "}
              <Text className="font-bold" style={{ color: THEME.text as any }} onPress={() => router.push("/(auth)/sign-up")}>
                Create an account
              </Text>
            </Text>
          </View>

          {/* Optional helper note */}
          {/* <View className="mt-5 items-center">
            <Text className="text-center text-[12px]" style={{ color: THEME.sub as any }}>
              Your info stays private. You control what you share.
            </Text>
          </View> */}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

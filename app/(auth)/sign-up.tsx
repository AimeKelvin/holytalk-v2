// app/(auth)/sign-up.tsx (or whatever path you use)
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
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Facebook } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.28, 140); // slightly smaller than sign-in for balance

export default function EmailSignUp() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Web => CSS vars from globals.css; Native => JS fallbacks
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

  // Swap logo per theme
  const logoSource = isDark
    ? require("../../assets/icons/splash-icon-light.png")
    : require("../../assets/icons/splash-icon-dark.png");

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFacebook, setLoadingFacebook] = useState(false);
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
      // TODO: call your API
      await new Promise((r) => setTimeout(r, 800));
      Alert.alert("Success", "Account created!");
      // router.replace("/(tabs)/home");
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    try {
      setLoadingGoogle(true);
      await new Promise((r) => setTimeout(r, 600));
    } catch (e: any) {
      Alert.alert("Google sign-up failed", e?.message ?? "Try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onFacebook = async () => {
    try {
      setLoadingFacebook(true);
      await new Promise((r) => setTimeout(r, 600));
    } catch (e: any) {
      Alert.alert("Facebook sign-up failed", e?.message ?? "Try again.");
    } finally {
      setLoadingFacebook(false);
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        <Animated.View className="px-6" style={{ opacity: fade }}>
          {/* Tight logo + Jirani text */}
          <View className="mt-14 mb-8 flex-row items-center justify-center">
            <Image source={logoSource} style={{ width: logoSize, height: logoSize }} resizeMode="contain" />
           
          </View>

          {/* Copy */}
          <Text className="uppercase tracking-wide text-center text-[13px]" style={{ color: THEME.sub as any }}>
            Welcome to Jirani
          </Text>

          <Text
            className="text-center text-[28px] font-extrabold leading-9 mt-1.5 mb-4"
            style={{ color: THEME.text as any }}
          >
            Create your account
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: THEME.sub as any }}>
            Build itineraries, split costs, and coordinate with friends — all in one place.
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
                className="ml-2 flex-1  p-3 text-[16px]"
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

          {/* Create Account */}
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
            accessibilityLabel="Create account"
          >
            {busy ? (
              <ActivityIndicator color={isDark ? "#0B0B0B" : "#FFFFFF"} />
            ) : (
              <Text
                className="text-base font-semibold"
                style={{ color: isDark ? "#0B0B0B" : "#FFFFFF" }} // contrast text
              >
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="my-5 flex-row items-center">
            <View className="h-[1px] flex-1" style={{ backgroundColor: THEME.line as any }} />
            <Text className="mx-2 text-[13px]" style={{ color: THEME.sub as any }}>
              or
            </Text>
            <View className="h-[1px] flex-1" style={{ backgroundColor: THEME.line as any }} />
          </View>

          {/* Google */}
          <TouchableOpacity
            onPress={onGoogle}
            activeOpacity={0.9}
            disabled={loadingGoogle}
            className="w-full items-center justify-center rounded-full border py-3.5"
            style={{
              backgroundColor: THEME.card as any,
              borderColor: THEME.line as any,
              shadowColor: "#000",
              shadowOpacity: isDark ? 0.15 : 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign up with Google"
          >
            {loadingGoogle ? (
              <ActivityIndicator color={THEME.text as any} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  className="mr-2 h-5 w-5"
                  resizeMode="contain"
                />
                <Text className="text-base font-semibold" style={{ color: THEME.text as any }}>
                  Sign up with Google
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Facebook (monochrome to match brand style) */}
          <TouchableOpacity
            onPress={onFacebook}
            activeOpacity={0.9}
            disabled={loadingFacebook}
            className="mt-3 w-full items-center justify-center rounded-full border py-3.5"
            style={{
              backgroundColor: THEME.card as any,
              borderColor: THEME.line as any,
              shadowColor: "#000",
              shadowOpacity: isDark ? 0.15 : 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign up with Facebook"
          >
            {loadingFacebook ? (
              <ActivityIndicator color={THEME.text as any} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Facebook size={20} color={String(THEME.text)} />
                <Text className="ml-2 text-base font-semibold" style={{ color: THEME.text as any }}>
                  Sign up with Facebook
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-6 items-center">
            <Text className="text-[14px]" style={{ color: THEME.sub as any }}>
              Already have an account?{" "}
              <Text className="font-bold" style={{ color: THEME.text as any }} onPress={() => router.push("/(auth)/sign-in")}>
                Sign in
              </Text>
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.35, 160);

const COLORS = {
  bg: "#efefe8",   // soft app bg for this screen
  text: "#1A1A1A",
  sub: "#3D3D3D",
  brand: "#b08968",
  brandDark: "#6e4f37",
  line: "#E6E6E6",
  soft: "#f5f5dc",
};

export default function EmailSignIn() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

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
      // TODO: call your API: await api.signInWithEmail({ email, password: pw })
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
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <Animated.View className="px-6" style={{ opacity: fade }}>
          {/* Logo */}
          <View className="items-center mt-14 mb-8">
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
            />
          </View>

          {/* Copy */}
          <Text className="uppercase tracking-wide text-center text-[13px]" style={{ color: COLORS.sub }}>
            Welcome to Biblion
          </Text>

          <Text
            className="text-center text-[28px] font-extrabold leading-9 mt-1.5 mb-4"
            style={{ color: COLORS.text }}
          >
            Sign in with <Text style={{ color: COLORS.brand }}>Email</Text>
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: COLORS.sub }}>
            A minimalist Bible app with Shep—your gentle guide. Build a habit,
            share reflections, and keep your streaks alive.
          </Text>

          {/* Email field */}
          <View className="mt-6">
            <Text className="mb-2 text-[13px]" style={{ color: COLORS.sub }}>
              Email
            </Text>
            <View
              className="w-full flex-row items-center rounded-2xl border bg-white px-4 py-1.5"
              style={{
                borderColor: errors.email ? "#ef4444" : COLORS.line,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 6 },
                elevation: 2,
              }}
            >
              <Mail size={18} color={errors.email ? "#ef4444" : focus.email ? COLORS.brand : COLORS.brandDark} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#8a8a8a"
                className="ml-2 flex-1 text-[16px]"
                style={{ color: COLORS.text }}
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
            <Text className="mb-2 text-[13px]" style={{ color: COLORS.sub }}>
              Password
            </Text>
            <View
              className="w-full flex-row items-center rounded-2xl border bg-white px-4 py-1.5"
              style={{
                borderColor: errors.pw ? "#ef4444" : COLORS.line,
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 6 },
                elevation: 2,
              }}
            >
              <Lock size={18} color={errors.pw ? "#ef4444" : focus.pw ? COLORS.brand : COLORS.brandDark} />
              <TextInput
                value={pw}
                onChangeText={setPw}
                placeholder="••••••••"
                placeholderTextColor="#8a8a8a"
                className="ml-2 flex-1 text-[16px]"
                style={{ color: COLORS.text }}
                secureTextEntry={!showPw}
                autoCapitalize="none"
                returnKeyType="done"
                onFocus={() => setFocus((f) => ({ ...f, pw: true }))}
                onBlur={() => setFocus((f) => ({ ...f, pw: false }))}
              />
              <Pressable onPress={() => setShowPw((v) => !v)} hitSlop={8} className="pl-2">
                {showPw ? <Eye size={18} color={COLORS.brandDark} /> : <EyeOff size={18} color={COLORS.brandDark} />}
              </Pressable>
            </View>
            {errors.pw && <Text className="mt-1 text-xs text-red-500">{errors.pw}</Text>}
          </View>

          {/* Forgot password */}
          <View className="mt-3 items-end">
            {/* Replace with <Link href="/(auth)/forgot"> if using expo-router */}
            <Text className="text-[13px] font-semibold" style={{ color: COLORS.brandDark }}>
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
              backgroundColor: COLORS.brand,
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
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-semibold text-white">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-4 items-center">
            <Text className="text-[14px]" style={{ color: COLORS.sub }}>
              New here?{" "}
              <Text className="font-bold" style={{ color: COLORS.brand }}>
                Create an account
              </Text>
            </Text>
          </View>

          <View className="mt-5 items-center">
            <Text className="text-center text-[12px] text-[#6f6f6f]">
              Shep: “One step at a time. Your info stays private.”
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

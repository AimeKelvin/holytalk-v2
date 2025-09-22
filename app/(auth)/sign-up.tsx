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
import { Mail, Lock, Eye, EyeOff, ChevronLeft, Facebook } from "lucide-react-native";
import { useRouter } from "expo-router"; // If using React Navigation: import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.35, 160);

const COLORS = {
  bg: "#efefe8", // soft app bg for this screen
  text: "#1A1A1A",
  sub: "#3D3D3D",
  brand: "#b08968",
  brandDark: "#6e4f37",
  Dark: "#292828ff",
  line: "#E6E6E6",
  soft: "#f5f5dc",
};

export default function EmailSignUp() {
  const fade = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const router = useRouter(); // If using React Navigation: const navigation = useNavigation();

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
      // TODO: call your API: await api.registerWithEmail({ email, password: pw })
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
      // TODO: integrate Google OAuth for signup
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
      // TODO: integrate Facebook OAuth for signup
      await new Promise((r) => setTimeout(r, 600));
    } catch (e: any) {
      Alert.alert("Facebook sign-up failed", e?.message ?? "Try again.");
    } finally {
      setLoadingFacebook(false);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.bg }}>
      {/* Back arrow (icon only, no button background) */}
      <TouchableOpacity
        className="mt-10"
        onPress={() => router.back()} // Or navigation.goBack()
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          zIndex: 50,
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ChevronLeft size={28} strokeWidth={2.5} color={COLORS.Dark} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
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
            Create your account 
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: COLORS.sub }}>
          Open the Word, share your thoughts, and let Shep encourage you back when life feels busy.
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

          {/* Create Account button */}
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
            accessibilityLabel="Create account"
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-semibold text-white">Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Spacer */}
          <View className="mt-5" />

          {/* Divider */}
          <View className="my-2 flex-row items-center">
            <View className="h-[1px] flex-1" style={{ backgroundColor: COLORS.line }} />
            <Text className="mx-2 text-[13px]" style={{ color: COLORS.sub }}>
              or
            </Text>
            <View className="h-[1px] flex-1" style={{ backgroundColor: COLORS.line }} />
          </View>

          {/* Social sign-up buttons (spacious & clean) */}
          {/* Google */}
          <TouchableOpacity
            onPress={onGoogle}
            activeOpacity={0.9}
            disabled={loadingGoogle}
            className="mt-4 w-full items-center justify-center rounded-full border bg-white py-3.5"
            style={{
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign up with Google"
          >
            {loadingGoogle ? (
              <ActivityIndicator color={COLORS.brand} />
            ) : (
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  className="mr-2 h-5 w-5"
                  resizeMode="contain"
                />
                <Text className="text-base font-semibold" style={{ color: COLORS.text }}>
                  Sign up with Google
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            onPress={onFacebook}
            activeOpacity={0.9}
            disabled={loadingFacebook}
            className="mt-3 w-full items-center justify-center rounded-full border bg-white py-3.5"
            style={{
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
            accessibilityRole="button"
            accessibilityLabel="Sign up with Facebook"
          >
            {loadingFacebook ? (
              <ActivityIndicator color="#1877F2" />
            ) : (
              <View className="flex-row items-center justify-center">
                <Facebook size={20} color="#1877F2" />
                <Text className="ml-2 text-base font-semibold" style={{ color: COLORS.text }}>
                  Sign up with Facebook
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-6 items-center">
            <Text className="text-[14px]" style={{ color: COLORS.sub }}>
              Already have an account?{" "}
              <Text className="font-bold" style={{ color: COLORS.brand }} onPress={() => router.push("/(auth)/sign-in")}>
                Sign in
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

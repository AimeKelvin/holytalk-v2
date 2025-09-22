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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Facebook } from "lucide-react-native";
import { useRouter } from "expo-router"; // ← add this

const { width } = Dimensions.get("window");
const logoSize = Math.min(width * 0.35, 160);

const COLORS = {
  bg: "#efefe8",
  text: "#1A1A1A",
  sub: "#3D3D3D",
  brand: "#b08968",
  brandDark: "#6e4f37",
  line: "#E6E6E6",
  soft: "#f5f5dc",
};

export default function SignIn() {
  const router = useRouter(); // ← get router
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
    <SafeAreaView className="flex-1 bg-[#efefe8]">
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

          <Text className="uppercase tracking-wide text-center text-[13px]" style={{ color: COLORS.sub }}>
            Welcome to Biblion
          </Text>

          <Text
            className="text-center text-[28px] font-extrabold leading-9 mt-1.5 mb-4"
            style={{ color: COLORS.text }}
          >
            Let’s walk through <Text style={{ color: COLORS.brand }}> Scripture</Text> together
          </Text>

          <Text className="text-center text-[15px] mt-2.5" style={{ color: COLORS.sub }}>
            Open the Word, share your thoughts, and let Shep encourage you back when life feels busy.
          </Text>

          {/* Google Button */}
          <TouchableOpacity
            onPress={onGoogle}
            activeOpacity={0.9}
            disabled={loadingGoogle}
            className="mt-6 w-full items-center justify-center rounded-full border bg-white py-3.5"
            style={{
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
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
            className="mt-3 w-full items-center justify-center rounded-full border bg-white py-3.5"
            style={{
              borderColor: COLORS.line,
              shadowColor: "#000",
              shadowOpacity: 0.06,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            {loadingFacebook ? (
              <ActivityIndicator color="#1877F2" />
            ) : (
              <View className="flex-row items-center justify-center">
                <Facebook size={20} color="#1877F2" />
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

          {/* Email Button → redirect to email sign-in screen */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")} // ← THIS is the change
            className="w-full items-center rounded-2xl border py-3.5"
            style={{ backgroundColor: COLORS.soft, borderColor: COLORS.line }}
          >
            <Text className="font-bold" style={{ color: COLORS.brandDark }}>
              Sign in with Email
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="mt-4 items-center">
            <Text className="text-[14px]" style={{ color: COLORS.sub }}>
              New here?{" "}
              <Text
                className="font-bold"
                style={{ color: COLORS.brand }}
                onPress={() => router.push("/(auth)/sign-up")}
              >
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

// app/index.tsx
import React, { useEffect, useRef } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 650,
      useNativeDriver: true,
      delay: 150,
    }).start();
  }, []);

  const onReady = () => {
    videoRef.current?.playAsync?.().catch(() => {});
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" translucent />

      {/* Video background */}
      <Video
        ref={videoRef}
        source={require("../assets/videos/zrwanda.mp4")}
        className="absolute inset-0"
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
        isMuted
        onReadyForDisplay={onReady}
      />

      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black/50" />

      <SafeAreaView className="flex-1">
        {/* Center content */}
        <View className="flex-1 items-center justify-center px-6">
          <Animated.View style={{ opacity: fade }} className="items-center">
            <Image
              source={require("../assets/images/logo.png")}
              className="w-40 h-40"
              resizeMode="contain"
            />
            <Text className="mt-4 text-4xl font-extrabold text-white">
              Jirani
            </Text>
            <Text className="mt-2 text-base font-medium text-white/80 text-center">
              Digital Tourism Adventure Pass
            </Text>
          </Animated.View>
        </View>

        {/* Bottom button */}
        <Animated.View style={{ opacity: fade }} className="px-6 pb-8">
          <Pressable
            onPress={() => router.push("/(auth)/sign-in")}
            className="rounded-full bg-white py-4 items-center shadow-md"
          >
            <Text className="text-base font-bold text-black">Get started</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

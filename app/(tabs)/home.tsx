import { View, Text } from "react-native";
import { Link } from "expo-router";
export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-brand-700">Home (Daily Verse)</Text>
      <Link href="/(auth)/sign-in" className="text-[#6e4f37] text-[13px] font-semibold">
       Sign in
       </Link>
    </View>
  );
}

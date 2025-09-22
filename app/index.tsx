import { Redirect } from "expo-router";

export default function Index() {
  // TODO: replace with real flags
  const signedIn = false;

  if (signedIn) return <Redirect href="/(tabs)/home" />;
  return <Redirect href="/(auth)/sign-in" />;
}

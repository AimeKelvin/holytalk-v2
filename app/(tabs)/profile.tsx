// app/(tabs)/profile.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  useColorScheme,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MoreVertical,
  Settings,
  Shield,
  FileText,
  HelpCircle,
  LogOut,
  CreditCard,
  Bell,
  Info,
  IdCard,
  Phone,
  Mail,
  UserPlus,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
} from "lucide-react-native";
import { useRouter } from "expo-router";

type ProfileState = {
  name?: string;
  email?: string;
  phone?: string;
  passport?: { number: string; expires: string };
  nationalId?: { number: string };
  payment?: { brand: string; last4: string };
  emergencyContact?: { name: string; phone: string };
};

export default function Profile() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  // Web uses globals.css vars; native uses hex fallbacks
  const THEME = Platform.select({
    web: {
      bg: "var(--app-bg)",
      text: "var(--app-text)",
      sub: "var(--app-sub)",
      line: "var(--app-line)",
      card: "var(--app-card)",
      soft: "var(--app-soft)",
    },
    default: {
      bg: isDark ? "#0B0B0B" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#0B0B0B",
      sub: isDark ? "#9CA3AF" : "#6B7280",
      line: isDark ? "#2A2A2A" : "#E5E7EB",
      card: isDark ? "#111111" : "#FFFFFF",
      soft: isDark ? "#151515" : "#F3F4F6",
    },
  });

  // Mock user data (replace with your real source)
  const [profile, setProfile] = useState<ProfileState>({
    name: "Alex N.",
    email: "alex@example.com",
    phone: "+250 788 123 456",
    passport: undefined,
    nationalId: undefined,
    payment: undefined,
    emergencyContact: undefined,
  });

  const requiredFlags = {
    name: !!profile.name,
    email: !!profile.email,
    phone: !!profile.phone,
    passport: !!profile.passport,
    nationalId: !!profile.nationalId,
    payment: !!profile.payment,
    emergencyContact: !!profile.emergencyContact,
  };

  const completion = useMemo(() => {
    const vals = Object.values(requiredFlags);
    const done = vals.filter(Boolean).length;
    return { done, total: vals.length, pct: Math.round((done / vals.length) * 100) };
  }, [requiredFlags]);

  // Quick mock actions
  const quickAdd = {
    passport: () =>
      setProfile((p) => ({ ...p, passport: { number: "PN1234567", expires: "2030-08-14" } })),
    nationalId: () =>
      setProfile((p) => ({ ...p, nationalId: { number: "1199-0000-0000-0000" } })),
    payment: () => setProfile((p) => ({ ...p, payment: { brand: "VISA", last4: "4242" } })),
    emergency: () =>
      setProfile((p) => ({ ...p, emergencyContact: { name: "Patricia", phone: "+250 789 000 111" } })),
  };

  // Dropdown menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { label: "Settings", icon: Settings, route: "/settings" },
    { label: "Privacy", icon: Shield, route: "/legal/privacy" },
    { label: "Terms", icon: FileText, route: "/legal/terms" },
    { label: "Payment Methods", icon: CreditCard, route: "/profile/payment" },
    { label: "Travel Documents", icon: IdCard, route: "/profile/documents" },
    { label: "Notifications", icon: Bell, route: "/settings/notifications" },
    { label: "Help & Support", icon: HelpCircle, route: "/support" },
    { label: "About", icon: Info, route: "/about" },
    { label: "Log out", icon: LogOut, action: () => Alert.alert("Log out", "You’ve been logged out (mock).") },
  ];

  // UI atoms
  const Card = ({ children }: { children: React.ReactNode }) => (
    <View
      className="rounded-2xl mb-3"
      style={{
        backgroundColor: THEME!.card as any,
        borderWidth: 1,
        borderColor: THEME!.line as any,
        padding: 14,
      }}
    >
      {children}
    </View>
  );

  const Row = ({
    icon,
    title,
    subtitle,
    ok,
    onPress,
    cta,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    ok?: boolean;
    onPress?: () => void;
    cta?: string;
  }) => (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View className="flex-row items-center justify-between py-2">
        <View className="flex-row items-center flex-1">
          <View
            className="items-center justify-center rounded-xl"
            style={{
              width: 36,
              height: 36,
              backgroundColor: THEME!.soft as any,
              borderWidth: 1,
              borderColor: THEME!.line as any,
            }}
          >
            {icon}
          </View>
          <View className="ml-3 flex-1">
            <Text style={{ color: THEME!.text as any, fontWeight: "700" }}>{title}</Text>
            {!!subtitle && <Text style={{ color: THEME!.sub as any, fontSize: 12 }}>{subtitle}</Text>}
          </View>
        </View>

        <View className="flex-row items-center">
          {ok ? (
            <ShieldCheck size={18} color={String(THEME!.text)} />
          ) : (
            <AlertTriangle size={18} color={isDark ? "#FCA5A5" : "#DC2626"} />
          )}
          <Text style={{ color: THEME!.sub as any, fontSize: 12, marginLeft: 6, marginRight: 6 }}>
            {ok ? "Added" : "Missing"}
          </Text>
          {onPress ? <ChevronRight size={18} color={String(THEME!.sub)} /> : null}
        </View>
      </View>

      {!!cta && onPress && (
        <Pressable
          onPress={onPress}
          className="mt-2 self-start rounded-full px-3 py-2"
          style={{ backgroundColor: THEME!.text as any }}
        >
          <Text style={{ color: isDark ? "#0B0B0B" : "#FFFFFF", fontWeight: "700", fontSize: 12 }}>
            {cta}
          </Text>
        </Pressable>
      )}
    </Pressable>
  );

  // Avatar initials
  const initials = useMemo(() => {
    const n = profile.name || "Guest User";
    return n
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [profile.name]);

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: THEME!.bg as any }}>
      {/* Header / Navbar */}
      <View
        className="px-4 pb-2"
        style={{ borderBottomWidth: 1, borderBottomColor: THEME!.line as any }}
      >
        <View className="h-14 flex-row items-center justify-between">
          <Text style={{ color: THEME!.text as any, fontSize: 22, fontWeight: "800" }}>Profile</Text>

          {/* Menu button */}
          <Pressable
            onPress={() => setMenuOpen((v) => !v)}
            hitSlop={10}
            className="rounded-xl p-1.5"
            style={{ backgroundColor: THEME!.soft as any, borderWidth: 1, borderColor: THEME!.line as any }}
          >
            <MoreVertical size={18} color={String(THEME!.text)} />
          </Pressable>

          {/* Dropdown */}
          {menuOpen && (
            <>
              {/* overlay to close */}
              <Pressable
                onPress={() => setMenuOpen(false)}
                style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
              />
              <View
                style={{
                  position: "absolute",
                  top: 56,
                  right: 12,
                  backgroundColor: THEME!.card as any,
                  borderColor: THEME!.line as any,
                  borderWidth: 1,
                  borderRadius: 12,
                  paddingVertical: 6,
                  width: 240,
                  shadowColor: "#000",
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 8,
                  zIndex: 50,
                }}
              >
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const onPress = () => {
                    setMenuOpen(false);
                    if (item.action) return item.action();
                    if (item.route) router.push(item.route as any);
                  };
                  return (
                    <Pressable
                      key={idx}
                      onPress={onPress}
                      className="flex-row items-center px-3 py-2"
                      style={{
                        borderTopWidth: idx === 0 ? 0 : 1,
                        borderTopColor: THEME!.line as any,
                      }}
                    >
                      <Icon size={18} color={String(THEME!.text)} />
                      <Text style={{ marginLeft: 10, color: THEME!.text as any, fontWeight: "600" }}>
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} className="px-4" showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <Card>
          <View className="flex-row items-center">
            <View
              className="items-center justify-center rounded-full"
              style={{
                width: 72,
                height: 72,
                backgroundColor: THEME!.soft as any,
                borderWidth: 1,
                borderColor: THEME!.line as any,
              }}
            >
              <Text style={{ color: THEME!.text as any, fontSize: 24, fontWeight: "800" }}>
                {initials}
              </Text>
            </View>
            <View className="ml-3 flex-1">
              <Text style={{ color: THEME!.text as any, fontSize: 18, fontWeight: "800" }}>
                {profile.name || "Add your name"}
              </Text>
              <Text style={{ color: THEME!.sub as any }}>{profile.email || "Add email"}</Text>
            </View>

            {/* Edit Profile button (Instagram-style inline) */}
            <Pressable
              onPress={() => router.push("/profile/edit")}
              className="rounded-full px-3 py-2"
              style={{
                backgroundColor: THEME!.soft as any,
                borderWidth: 1,
                borderColor: THEME!.line as any,
              }}
            >
              <Text style={{ color: THEME!.text as any, fontWeight: "700", fontSize: 12 }}>
                Edit Profile
              </Text>
            </Pressable>
          </View>

          {/* Completion */}
          <View className="mt-4">
            <View className="flex-row items-center justify-between">
              <Text style={{ color: THEME!.sub as any, fontSize: 12 }}>Account completion</Text>
              <Text style={{ color: THEME!.text as any, fontSize: 12, fontWeight: "700" }}>
                {completion.pct}%
              </Text>
            </View>
            <View className="mt-2 rounded-full" style={{ backgroundColor: THEME!.line as any, height: 8 }}>
              <View
                className="rounded-full"
                style={{
                  width: `${Math.max(6, completion.pct)}%`,
                  backgroundColor: THEME!.text as any,
                  height: 8,
                }}
              />
            </View>
            <Text className="mt-2" style={{ color: THEME!.sub as any, fontSize: 12 }}>
              Complete your profile to let Jirani book flights, hotels, rides & attractions under a single Pass.
            </Text>
          </View>
        </Card>

        {/* Identity & Travel Docs */}
        <Card>
          <Text style={{ color: THEME!.text as any, fontWeight: "800", marginBottom: 8 }}>
            Identity & Travel Documents
          </Text>

          <Row
            icon={<IdCard size={18} color={String(THEME!.text)} />}
            title="Passport"
            subtitle={
              profile.passport
                ? `•••• ${profile.passport.number.slice(-4)} · Expires ${profile.passport.expires}`
                : "Required to book international flights"
            }
            ok={!!profile.passport}
            onPress={() => quickAdd.passport()}
            cta={profile.passport ? undefined : "Add Passport"}
          />

          <Row
            icon={<IdCard size={18} color={String(THEME!.text)} />}
            title="National ID"
            subtitle={
              profile.nationalId ? `•••• ${profile.nationalId.number.slice(-4)}` : "Required for local bookings & KYC"
            }
            ok={!!profile.nationalId}
            onPress={() => quickAdd.nationalId()}
            cta={profile.nationalId ? undefined : "Add National ID"}
          />
        </Card>

        {/* Contact & Emergency */}
        <Card>
          <Text style={{ color: THEME!.text as any, fontWeight: "800", marginBottom: 8 }}>
            Contact & Emergency
          </Text>

          <Row
            icon={<Phone size={18} color={String(THEME!.text)} />}
            title="Phone"
            subtitle={profile.phone || "Add a phone number"}
            ok={!!profile.phone}
            onPress={() => {}}
            cta={profile.phone ? undefined : "Add Phone"}
          />

          <Row
            icon={<Mail size={18} color={String(THEME!.text)} />}
            title="Email"
            subtitle={profile.email || "Add an email"}
            ok={!!profile.email}
            onPress={() => {}}
            cta={profile.email ? undefined : "Add Email"}
          />

          <Row
            icon={<UserPlus size={18} color={String(THEME!.text)} />}
            title="Emergency Contact"
            subtitle={
              profile.emergencyContact
                ? `${profile.emergencyContact.name} · ${profile.emergencyContact.phone}`
                : "Recommended for travel safety"
            }
            ok={!!profile.emergencyContact}
            onPress={() => quickAdd.emergency()}
            cta={profile.emergencyContact ? undefined : "Add Contact"}
          />
        </Card>

        {/* Payments */}
        <Card>
          <Text style={{ color: THEME!.text as any, fontWeight: "800", marginBottom: 8 }}>
            Payment
          </Text>
          <Row
            icon={<CreditCard size={18} color={String(THEME!.text)} />}
            title="Primary Payment Method"
            subtitle={profile.payment ? `${profile.payment.brand} · •••• ${profile.payment.last4}` : "Required to confirm bookings"}
            ok={!!profile.payment}
            onPress={() => quickAdd.payment()}
            cta={profile.payment ? undefined : "Add Payment Method"}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

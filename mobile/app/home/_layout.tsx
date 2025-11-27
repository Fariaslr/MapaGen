import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  Text,
} from "react-native";
import { useRef, useState } from "react";
import NotificationDrawer from "@/components/NotificationDrawer";
import { Picker } from "@react-native-picker/picker";
import { useCcps } from "@/src/context/ccpsContext";
import { useAppContext } from "@/src/context/authContext";
import CcpsModal from "@/components/CcpsModal";

const { width } = Dimensions.get("window");

export default function Layout() {
  const [visible, setVisible] = useState(false);
  const [ccpsModalVisible, setCcpsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;

  const { ccpsList, currentCcps, setCurrentCcps } = useCcps();
  const { user } = useAppContext();
  const isVeterinario = user?.tipo_usuario === "VETERINARIO";

  const openPanel = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const mockNotifications = [
    "Novo chamado disponível",
    "Seu CCPS foi aprovado",
    "Atualização na legislação",
  ];

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#f8f8f8",
            height: 90,
            paddingBottom: 10,
            paddingTop: 10,
          },
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTitleStyle: { color: "white" },
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              {isVeterinario && (
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={() => setCcpsModalVisible(true)}
                >
                  <Text style={{ color: "white" }}>
                    {currentCcps?.nomeCcps ?? "Selecionar CCPS"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 15, marginRight: 15 }}>
              <TouchableOpacity onPress={openPanel}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="validacao"
          options={{
            title: "Validação",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <NotificationDrawer
        visible={visible}
        slideAnim={slideAnim}
        onClose={closePanel}
        notifications={mockNotifications}
      />
      <CcpsModal
        visible={ccpsModalVisible}
        onClose={() => setCcpsModalVisible(false)}
      />
    </>
  );
}

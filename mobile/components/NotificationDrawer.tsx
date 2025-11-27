import { Animated, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface NotificationDrawerProps {
  slideAnim: Animated.Value;
  visible: boolean;
  onClose: () => void;
  notifications: string[]; 
}

export default function NotificationDrawer({
  slideAnim,
  visible,
  onClose,
  notifications,
}: NotificationDrawerProps) {
  if (!visible) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onClose}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width,
          height,
          backgroundColor: "#fff",
          transform: [{ translateX: slideAnim }],
          paddingTop: 60,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={onClose}
          style={{ position: "absolute", top: 40, right: 20 }}
        >
          <Ionicons name="close-outline" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Notificações
        </Text>

        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#e8e8e8",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <Text>{item}</Text>
            </View>
          )}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

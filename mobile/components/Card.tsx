import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
}

const Card = ({ icon, label, value }: CardProps) => {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={24} color="#4CAF50" />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    color: "#555",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
});

export default Card;

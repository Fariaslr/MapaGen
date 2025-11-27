import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ChecklistItemProps {
  title: string;
  done: boolean;
}

const ChecklistItem = ({ title, done }: ChecklistItemProps) => {
  return (
    <View style={styles.item}>
      <Ionicons
        name={done ? "checkmark-circle" : "ellipse-outline"}
        size={20}
        color={done ? "green" : "gray"}
      />
      <Text style={[styles.text, done && styles.done]}>{title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={25}
        color="#999"
        style={styles.chevron}
        onPress={() => {console.log(title + " pressed")}} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
  },
  done: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  chevron: {
    marginLeft: "auto",
  },
});

export default ChecklistItem;

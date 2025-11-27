import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

const CardGroup = () => {
  return (
    <View style={styles.group}>
      <Card icon="document-text-outline" label="Validados" value="5" />
      <Card icon="alert-circle-outline" label="Pendentes" value="2" />
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },
});

export default CardGroup;

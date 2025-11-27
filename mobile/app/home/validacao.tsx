import FullChecklist from "@/components/FullCheckList";
import { StyleSheet, ScrollView } from "react-native";

export default function Validacao() {
  return (
    <ScrollView style={styles.container}>
      <FullChecklist /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
});

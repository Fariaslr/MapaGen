import { checkList } from "@/src/data/checklist";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function CheckListSection() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {checkList.map((capitulo, capIndex) => (
        <View key={capIndex} style={styles.container}>
          <TouchableOpacity
            onPress={() => toggleExpanded(capIndex)}
            style={styles.header}
          >
            <Text style={styles.title}>{capitulo.title}</Text>
            <Ionicons
              name={
                expanded[capIndex]
                  ? "chevron-up-outline"
                  : "chevron-down-outline"
              }
              size={20}
              color="#333"
            />
          </TouchableOpacity>

          {expanded[capIndex] &&
            capitulo.sections.map((section, secIndex) => (
              <View key={secIndex} style={styles.itemsContainer}>
                <Text style={styles.subtitle}>{section.title}</Text>
                {section.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={() =>
                      router.push({
                        pathname: `/chat/${item.route}`, // Use a rota correta com o tipoId, por exemplo.
                      })
                    }
                    style={styles.itemRow}
                  >
                    <Ionicons
                      name={item.done ? "checkmark-circle" : "ellipse-outline"}
                      size={20}
                      color={item.done ? "green" : "gray"}
                      style={styles.bullet}
                    />
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#999"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  itemsContainer: {
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bullet: {
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
  },
});

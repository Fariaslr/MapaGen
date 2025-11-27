import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface Props {
  progress: number;
}

const ProgressGraph: React.FC<Props> = ({ progress }) => {
  const strokeDasharray = `${progress * 2.83} ${283 - progress * 2.83}`;
  const router = useRouter();

  const getProgressColor = (value: number) => {
    if (value <= 1) return "#FF3B30"; 
    if (value <= 99) return "#FFD60A"; 
    return "#4CAF50"; 
  };

  const strokeColor = getProgressColor(progress);

  return (
    <Pressable
      style={styles.progressContainer}
      android_ripple={{ color: "#ddd" }}
      onPress={() => router.push("/home/validacao")}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Progresso das Etapas</Text>
        <Text style={styles.description}>
          Toque no gráfico para ver mais detalhes.
        </Text>
      </View>
      <View style={styles.graphContainer}>
        <Svg width={150} height={150} viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#eee"
            strokeWidth="10"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke={strokeColor}
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </Svg>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  content: {
    width: "100%",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  graphContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  progressText: {
    position: "absolute",
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProgressGraph;

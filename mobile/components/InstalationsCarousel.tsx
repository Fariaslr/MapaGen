import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import InstallationModal from "./InstallationModal";
import { FONT_SIZES } from "@/constants/theme";

const { width } = Dimensions.get("window");

interface Installation {
  title: string;
  description: string;
  image: { uri: string };
}

interface Props {
  installations: Installation[];
}

const CARD_WIDTH = width * 0.9;
const SPACING = 20;

const InstallationsCarousel: React.FC<Props> = ({ installations }) => {
  const [selectedInstallation, setSelectedInstallation] =
    useState<Installation | null>(null);

  const renderItem = ({
    item,
    index,
  }: {
    item: Installation;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedInstallation(item)}
      style={[
        styles.card,
        {
          marginLeft: index === 0 ? 0 : SPACING,
          marginRight: index === installations.length - 1 ? 0 : 0,
        },
      ]}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.overlay} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instalações exigidas</Text>
      <FlatList
        data={installations}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + SPACING}
        renderItem={renderItem}
      />

      <InstallationModal
        visible={selectedInstallation !== null}
        installation={selectedInstallation}
        onClose={() => setSelectedInstallation(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: "#444",
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  modalClose: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "right",
    fontWeight: "500",
  },
  bottomModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  bottomModal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },

  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default InstallationsCarousel;

import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Installation {
  title: string;
  description: string;
}

interface Props {
  visible: boolean;
  installation: Installation | null;
  onClose: () => void;
}

const InstallationModal: React.FC<Props> = ({ visible, installation, onClose }) => {
  if (!installation) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.handleBar} />
          <Text style={styles.title}>{installation.title}</Text>
          <Text style={styles.description}>{installation.description}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.close}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  close: {
    color: "#007bff",
    fontSize: 16,
    textAlign: "right",
    fontWeight: "500",
  },
});

export default InstallationModal;

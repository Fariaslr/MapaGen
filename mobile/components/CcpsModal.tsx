import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useAppContext } from "@/src/context/authContext";

interface CcpsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CcpsModal({ visible, onClose }: CcpsModalProps) {
  const { user } = useAppContext();
  const [selectedCcps, setSelectedCcps] = useState<string>("");
  const userData = user ?? { ccpsList: [], nome: "Desconhecido" };

  useEffect(() => {
    // Verifica se user e user.ccpsList não são null ou undefined
    if (user && user.ccpsList?.length > 0 && !selectedCcps) {
      setSelectedCcps(user.ccpsList[0].id); // Define o valor inicial para o primeiro CCPS
    }
  }, [user?.ccpsList, selectedCcps]);  // Reage à mudança em ccpsList
  

  const handleConfirmSelection = () => {
    // Encontra o CCPS selecionado a partir de user.ccpsList
    const selected = user?.ccpsList?.find((ccps) => ccps.id === selectedCcps);
    if (selected) {
      // Aqui, você pode realizar qualquer ação com o CCPS selecionado
      console.log("Selected CCPS:", selected); // Apenas como exemplo
    }
    onClose(); // Fecha o modal após a seleção
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Meus Centros de Coleta</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userInfo}>Veterinário: {user?.nome}</Text>

          {userData?.ccpsList?.length > 0 ? (
            <>
              <Picker
                selectedValue={selectedCcps}
                onValueChange={(itemValue) => setSelectedCcps(itemValue)}
                style={styles.picker}
                dropdownIconColor="#4CAF50"
              >
                {user?.ccpsList.map((ccps) => (
                  <Picker.Item
                    key={ccps.id}
                    label={`${ccps.nomeCcps} - ${ccps.cidade}/${ccps.estado}`}
                    value={ccps.id}
                    style={styles.pickerItem}
                  />
                ))}
              </Picker>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmSelection}
              >
                <Text style={styles.confirmButtonText}>Confirmar Seleção</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noCcpsText}>
              Você não possui CCPS cadastrados
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  userInfo: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
    fontStyle: "italic",
  },
  picker: {
    marginBottom: 20,
    backgroundColor: "black",
    borderRadius: 8,
  },
  pickerItem: {
    fontSize: 16,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noCcpsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#7f8c8d",
  },
});

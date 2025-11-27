import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAppContext } from "../../src/context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const router = useRouter();
  const { user, setUsuario } = useAppContext();  // Acessando o 'user' e 'setUsuario' corretamente do contexto
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("usuario");
      router.replace("/Login");
      setUsuario(null); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Carregando dados do perfil...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Dados do veterinário não encontrados.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{user.nome || "Não disponível"}</Text>

      <Text style={styles.label}>CRMV:</Text>
      <Text style={styles.value}>{user.crmv || "Não disponível"}</Text>

      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.value}>{user.email || "Não disponível"}</Text>

      <Text style={styles.label}>Data de nascimento:</Text>
      <Text style={styles.value}>{user.data_nascimento || "Não disponível"}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{user.telefone || "Não disponível"}</Text>

      <Text style={styles.label}>Tipo usuário:</Text>
      <Text style={styles.value}>{user.tipo_usuario || "Não disponível"}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

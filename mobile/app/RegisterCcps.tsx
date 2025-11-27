import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaskedTextInput } from "react-native-mask-text";

export default function RegisterCcps() {
  const router = useRouter();
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [error, setError] = useState<{ nome?: string; cnpj?: string; cep?: string; telefone?: string }>({});

  const buscarCep = async (cep: string) => {
    if (cep.length !== 9) return; 

    try {
      const response = await fetch(`http://cep.republicavirtual.com.br/web_cep.php?cep=${cep}&formato=json`);
      const data = await response.json();

      if (data.resultado === "1") {
        setEndereco(`${data.tipo_logradouro} ${data.logradouro}, ${data.bairro}, ${data.cidade} - ${data.uf}`);
        setError(prev => ({ ...prev, cep: undefined }));
      } else {
        setError(prev => ({ ...prev, cep: "CEP inválido!" }));
        setEndereco("");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    }
  };

  const validateFields = () => {
    let errors: { nome?: string; cnpj?: string; cep?: string; telefone?: string } = {};

    if (!nome.trim()) errors.nome = "Nome do CCPS é obrigatório!";
    if (cnpj.length !== 18) errors.cnpj = "CNPJ inválido!";
    if (cep.length !== 9) errors.cep = "CEP inválido!";
    if (telefone.length !== 15) errors.telefone = "Número de telefone inválido!";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateFields()) {
      router.push("/RegisterVeterinario");
    }
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_cavalo-512.png",
          }}
        />
        <Text style={styles.title}>Cadastrar CCPS</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do CCPS</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rancho Estrela"
            value={nome}
            onChangeText={setNome}
          />
          {error.nome && <Text style={styles.error}>{error.nome}</Text>}

          <Text style={styles.label}>CNPJ</Text>
          <MaskedTextInput
            mask="99.999.999/9999-99"
            style={styles.input}
            placeholder="12.345.678/1234-01"
            keyboardType="numeric"
            value={cnpj}
            onChangeText={setCnpj}
          />
          {error.cnpj && <Text style={styles.error}>{error.cnpj}</Text>}

          <Text style={styles.label}>CEP</Text>
          <MaskedTextInput
            mask="99999-999"
            style={styles.input}
            placeholder="40010-000"
            keyboardType="numeric"
            value={cep}
            onChangeText={(text) => {
              setCep(text);
              setError(prev => ({ ...prev, cep: undefined }));
              if (text.length === 9) buscarCep(text);
            }}
          />
          {error.cep && <Text style={styles.error}>{error.cep}</Text>}
          
          {endereco ? <Text style={styles.address}>{endereco}</Text> : null}

          <Text style={styles.label}>Telefone</Text>
          <MaskedTextInput
            mask="(99) 99999-9999"
            style={styles.input}
            placeholder="(11) 91234-5678"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
          {error.telefone && <Text style={styles.error}>{error.telefone}</Text>}

          <TouchableOpacity
            style={[styles.button]}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    paddingVertical : 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  address: {
    fontSize: 14,
    color: "#333",
    backgroundColor: "#e9ecef",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

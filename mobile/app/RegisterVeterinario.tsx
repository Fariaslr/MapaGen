import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { MaskedTextInput } from "react-native-mask-text";
import axios from "axios"

export default function RegisterVeterinario() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [crmv, setCrmv] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{
    nome?: string;
    crmv?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateFields = () => {
    let errors: {
      nome?: string;
      crmv?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!nome.trim()) errors.nome = "Nome do veterinário é obrigatório!";
    if (crmv.length < 7) errors.crmv = "CRMV inválido!";
    if (!email.includes("@")) errors.email = "Digite um e-mail válido!";
    if (password.length < 6)
      errors.password = "A senha deve ter pelo menos 6 caracteres!";
    if (password !== confirmPassword)
      errors.confirmPassword = "As senhas não coincidem!";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.post("http://192.168.0.175:8080/veterinarios", {
        nome,
        crmv,
        email,
        senha: password,
      });

      Alert.alert("Sucesso", "Veterinário cadastrado com sucesso!");
      router.push("/");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      if (error.response?.status === 400) {
        Alert.alert("Erro", "Verifique os dados informados.");
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o veterinário.");
      }
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/health-care-and-first-responders-with-masks/64/doctor-asian-male-coronavirus-512.png",
          }}
        />
        <Text style={styles.title}>Cadastrar Veterinário</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do Veterinário</Text>
          <TextInput
            style={styles.input}
            placeholder="Marcos Cardoso..."
            value={nome}
            onChangeText={setNome}
          />
          {error.nome && <Text style={styles.error}>{error.nome}</Text>}

          <Text style={styles.label}>CRMV</Text>
          <MaskedTextInput
            mask="AA-99999"
            style={styles.input}
            placeholder="UF-12345"
            value={crmv}
            onChangeText={setCrmv}
          />
          {error.crmv && <Text style={styles.error}>{error.crmv}</Text>}

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          {error.email && <Text style={styles.error}>{error.email}</Text>}

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error.password && <Text style={styles.error}>{error.password}</Text>}

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {error.confirmPassword && (
            <Text style={styles.error}>{error.confirmPassword}</Text>
          )}

          <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    paddingVertical: 30,
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

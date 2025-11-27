import { Stack  } from "expo-router";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { listarSalasPorCcps } from "@/src/services/salaService";

interface SalaApi {
  id: string;
  ccpsId: string;
  tipoId: string;
  planta: string | null;
  foto1: string | null;
  foto2: string | null;
  foto3: string | null;
  observacaoVeterinario: string | null;
  observacaoAvaliador: string | null;
  statusValidacao: string;
  dataUltimaValidacao: string | null;
  codigoAprovado: string | null;
}

interface Mensagem {
  id: string;
  texto: string;
  data: string;
  autor: "Veterinário" | "Avaliador";
}

export default function ChatScreen() {
  const id  = "1";
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarMensagens() {
      try {
        setCarregando(true);
        setErro(null);
        
        if (!id) {
          throw new Error("ID do CCPS não fornecido");
        }

        console.log(`Buscando mensagens para CCPS ID: ${id}`);
        const salas = await listarSalasPorCcps(id);
        console.log("Dados recebidos:", salas);

        const todasMensagens = salas.flatMap((sala: SalaApi) => {
          const msgs: Mensagem[] = [];
          
          // Usa dataUltimaValidacao como fallback para a data
          const dataMensagem = sala.dataUltimaValidacao || new Date().toISOString();
          
          if (sala.observacaoVeterinario) {
            msgs.push({
              id: `vet-${sala.id}`,
              texto: sala.observacaoVeterinario,
              data: dataMensagem,
              autor: "Veterinário",
            });
          }
          
          if (sala.observacaoAvaliador) {
            msgs.push({
              id: `aval-${sala.id}`,
              texto: sala.observacaoAvaliador,
              data: dataMensagem,
              autor: "Avaliador",
            });
          }
          
          return msgs;
        });

        console.log("Mensagens processadas:", todasMensagens);
        setMensagens(todasMensagens);
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
        setErro(error instanceof Error ? error.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }

    carregarMensagens();
  }, [id]);

  function formatarData(data: string) {
    try {
      const d = new Date(data);
      if (isNaN(d.getTime())) return "Data inválida";
      
      return `${d.toLocaleDateString('pt-BR')} ${d.toLocaleTimeString('pt-BR', { 
        hour: "2-digit", 
        minute: "2-digit" 
      })}`;
    } catch {
      return "Data inválida";
    }
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.container}>
        <Text style={styles.erroText}>Erro: {erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Histórico de Mensagens" }} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Divider label={`Histórico do CCPS ${id}`} />
        
        {mensagens.length > 0 ? (
          mensagens.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={`${msg.autor}: ${msg.texto}`}
              date={formatarData(msg.data)}
              autor={msg.autor}
            />
          ))
        ) : (
          <Text style={styles.semMensagens}>Nenhuma mensagem encontrada</Text>
        )}
      </ScrollView>
    </View>
  );
}

function MessageBubble({ text, date, autor }: { 
  text: string; 
  date: string;
  autor: "Veterinário" | "Avaliador"; 
}) {
  return (
    <View style={[
      styles.bubble,
      autor === "Veterinário" ? styles.bubbleVet : styles.bubbleAval
    ]}>
      <Text style={styles.messageText}>{text}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  bubble: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleVet: {
    backgroundColor: '#e3f2fd',
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  bubbleAval: {
    backgroundColor: '#f1f8e9',
    borderLeftWidth: 4,
    borderLeftColor: '#689f38',
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerText: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    color: '#0055cc',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  semMensagens: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontSize: 16,
  },
  erroText: {
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
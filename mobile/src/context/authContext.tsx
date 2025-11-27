import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Usuario } from "../models/Usuario"; // Verifique se a estrutura do 'Usuario' está correta
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppContextType {
  user: Usuario | null; 
  setUsuario: (usuario: Usuario | null) => void;
  loadUserFromStorage: () => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        setUsuario(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserToStorage = async (usuario: Usuario | null) => {
    try {
      if (usuario) {
        await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
      } else {
        await AsyncStorage.removeItem("usuario");
      }
    } catch (error) {
      console.error("Erro ao salvar usuário no AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    saveUserToStorage(usuario);
  }, [usuario]);

  return (
    <AppContext.Provider value={{ user: usuario, setUsuario, loadUserFromStorage, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

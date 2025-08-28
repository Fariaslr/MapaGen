import { createContext, useContext, useReducer, useEffect } from 'react';
import { StatusValidacao } from '../types';

const AppContext = createContext();

// Estado inicial
const initialState = {
  ccpsList: [
    {
      id: '1',
      nome: 'CCPS São Paulo Centro',
      cnpj: '12.345.678/0001-90',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567',
      veterinario: {
        nome: 'Dr. João Silva',
        crmv: 'SP-12345'
      },
      codigoAprovado: 'MAPA-SP-001',
      dataValidade: '2024-12-31',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'CCPS Rio de Janeiro Norte',
      cnpj: '98.765.432/0001-10',
      endereco: 'Av. Atlântica, 456',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      cep: '22070-900',
      veterinario: {
        nome: 'Dra. Maria Santos',
        crmv: 'RJ-67890'
      },
      codigoAprovado: 'MAPA-RJ-002',
      dataValidade: '2024-11-15',
      status: 'pendente'
    },
    {
      id: '3',
      nome: 'CCPS Belo Horizonte',
      cnpj: '11.222.333/0001-44',
      endereco: 'Rua da Liberdade, 789',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      cep: '30112-000',
      veterinario: {
        nome: 'Dr. Carlos Oliveira',
        crmv: 'MG-11111'
      },
      codigoAprovado: '',
      dataValidade: null,
      status: 'em_analise'
    }
  ],
  operacoes: {
    '1': {
      id: '1',
      ccpsId: '1',
      arquivosProcessosTecnologicos: true,
      dataAprovacaoArquivos: '2024-01-15',
      fluxoOperacionalDefinido: false,
      dataAprovacaoFluxo: null,
      medidasHigienicoSanitariasFuncionarios: true,
      dataAprovacaoHigieneFunc: '2024-01-20',
      medidasHigienicoSanitariasVisitantes: false,
      dataAprovacaoHigieneVisit: null,
      controlePragas: true,
      dataAprovacaoControlePragas: '2024-01-18',
      sistemaEscoamento: false,
      dataAprovacaoEscoamento: null
    }
  },
  salas: {
    '1': [
      {
        id: '1',
        ccpsId: '1',
        tipo: { nomeTipo: 'Sala de Processamento' },
        planta: 'planta_sala_1.pdf',
        foto1: 'foto1_sala_1.jpg',
        foto2: 'foto2_sala_1.jpg',
        foto3: 'foto3_sala_1.jpg',
        observacaoVeterinario: 'Sala em conformidade com as normas sanitárias.',
        observacaoAvaliador: '',
        statusValidacao: StatusValidacao.PENDENTE,
        dataUltimaValidacao: null
      },
      {
        id: '2',
        ccpsId: '1',
        tipo: { nomeTipo: 'Sala de Armazenamento' },
        planta: 'planta_sala_2.pdf',
        foto1: 'foto1_sala_2.jpg',
        foto2: 'foto2_sala_2.jpg',
        foto3: '',
        observacaoVeterinario: 'Necessário melhorar ventilação.',
        observacaoAvaliador: 'Ventilação adequada após correções.',
        statusValidacao: StatusValidacao.APROVADO,
        dataUltimaValidacao: '2024-01-22'
      }
    ]
  },
  veterinarios: [
    {
      id: '1',
      nome: 'Dr. João Silva',
      crmv: 'SP-12345',
      cpf: '123.456.789-00',
      dataNascimento: '1980-05-15',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-9999'
    },
    {
      id: '2',
      nome: 'Dra. Maria Santos',
      crmv: 'RJ-67890',
      cpf: '987.654.321-00',
      dataNascimento: '1975-08-22',
      email: 'maria.santos@email.com',
      telefone: '(21) 88888-8888'
    },
    {
      id: '3',
      nome: 'Dr. Carlos Oliveira',
      crmv: 'MG-11111',
      cpf: '456.789.123-00',
      dataNascimento: '1985-12-10',
      email: 'carlos.oliveira@email.com',
      telefone: '(31) 77777-7777'
    }
  ],
  selectedCcps: null,
  notifications: []
};

// Reducer para gerenciar as ações
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_CCPS':
      return { ...state, selectedCcps: action.payload };
    
    case 'UPDATE_OPERACAO':
      return {
        ...state,
        operacoes: {
          ...state.operacoes,
          [action.payload.ccpsId]: {
            ...state.operacoes[action.payload.ccpsId],
            ...action.payload.updates
          }
        }
      };
    
    case 'UPDATE_SALA':
      return {
        ...state,
        salas: {
          ...state.salas,
          [action.payload.ccpsId]: state.salas[action.payload.ccpsId].map(sala =>
            sala.id === action.payload.salaId
              ? { ...sala, ...action.payload.updates }
              : sala
          )
        }
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload,
          timestamp: new Date().toISOString()
        }]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    
    case 'UPDATE_CCPS_STATUS':
      return {
        ...state,
        ccpsList: state.ccpsList.map(ccps =>
          ccps.id === action.payload.id
            ? { ...ccps, ...action.payload.updates }
            : ccps
        )
      };
    
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

// Provider do contexto
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const savedState = localStorage.getItem('mapa-validation-system');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Erro ao carregar estado salvo:', error);
      }
    }
  }, []);

  // Salvar estado no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('mapa-validation-system', JSON.stringify(state));
  }, [state]);

  // Funções auxiliares
  const actions = {
    setSelectedCcps: (ccps) => {
      dispatch({ type: 'SET_SELECTED_CCPS', payload: ccps });
    },

    updateOperacao: (ccpsId, updates) => {
      dispatch({ type: 'UPDATE_OPERACAO', payload: { ccpsId, updates } });
      
      // Adicionar notificação
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'success',
          title: 'Operação atualizada',
          message: 'Status da operação foi atualizado com sucesso.'
        }
      });
    },

    updateSala: (ccpsId, salaId, updates) => {
      dispatch({ type: 'UPDATE_SALA', payload: { ccpsId, salaId, updates } });
      
      // Adicionar notificação
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          type: 'success',
          title: 'Sala atualizada',
          message: `Status da sala foi atualizado para ${updates.statusValidacao || 'processando'}.`
        }
      });
    },

    addNotification: (notification) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    },

    removeNotification: (id) => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    },

    updateCcpsStatus: (id, updates) => {
      dispatch({ type: 'UPDATE_CCPS_STATUS', payload: { id, updates } });
    },

    // Função para calcular estatísticas
    getStats: () => {
      const totalCcps = state.ccpsList.length;
      const aprovados = state.ccpsList.filter(ccps => ccps.status === 'ativo').length;
      const pendentes = state.ccpsList.filter(ccps => ccps.status === 'pendente').length;
      const emAnalise = state.ccpsList.filter(ccps => ccps.status === 'em_analise').length;
      const rejeitados = state.ccpsList.filter(ccps => ccps.status === 'rejeitado').length;

      return {
        totalCcps,
        aprovados,
        pendentes,
        emAnalise,
        rejeitados
      };
    },

    // Função para obter atividades recentes
    getRecentActivities: () => {
      const activities = [];
      
      // Adicionar atividades baseadas no estado atual
      state.ccpsList.forEach(ccps => {
        if (state.salas[ccps.id]) {
          state.salas[ccps.id].forEach(sala => {
            if (sala.dataUltimaValidacao) {
              activities.push({
                id: `${ccps.id}-${sala.id}`,
                type: 'validacao',
                ccps: ccps.nome,
                action: `${sala.tipo.nomeTipo} ${sala.statusValidacao.toLowerCase()}`,
                time: new Date(sala.dataUltimaValidacao).toLocaleDateString('pt-BR'),
                status: sala.statusValidacao.toLowerCase()
              });
            }
          });
        }
      });

      return activities.slice(0, 5); // Retornar apenas as 5 mais recentes
    }
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook para usar o contexto
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}


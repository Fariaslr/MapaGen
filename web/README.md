# Sistema de Validação de Documentos MAPA

Sistema web desenvolvido em React com Vite para validação de documentos de Centros de Controle de Pragas e Sanitização (CCPS) pelos técnicos do MAPA.

## 📋 Funcionalidades

### Dashboard
- Visão geral das estatísticas do sistema
- Contadores de CCPS por status (Total, Pendentes, Aprovados, Em Análise)
- Lista de atividades recentes
- Ações rápidas para navegação

### Gerenciamento de CCPS
- Listagem completa dos CCPS cadastrados
- Busca por nome, cidade ou CNPJ
- Visualização de informações detalhadas
- Status de aprovação e validade

### Validação de Documentos
- **Operações**: Validação de processos operacionais
  - Arquivos de Processos Tecnológicos
  - Fluxo Operacional Definido
  - Medidas Higiênico-Sanitárias (Funcionários e Visitantes)
  - Controle de Pragas
  - Sistema de Escoamento

- **Salas**: Validação de instalações físicas
  - Visualização de plantas e fotos
  - Observações do veterinário responsável
  - Observações do avaliador técnico
  - Aprovação/rejeição com justificativas

### Gerenciamento de Veterinários
- Lista de veterinários responsáveis
- Informações de contato e CRMV
- CCPS sob responsabilidade

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interface de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS para estilização
- **Lucide React** - Biblioteca de ícones
- **Context API** - Gerenciamento de estado global
- **Local Storage** - Persistência de dados local

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone ou extraia o projeto**
   ```bash
   cd sistema-validacao-mapa
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173`

### Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes de interface base
│   ├── Dashboard.jsx    # Painel principal
│   ├── CcpsList.jsx     # Lista de CCPS
│   ├── ValidationPanel.jsx # Painel de validação
│   ├── VeterinariosList.jsx # Lista de veterinários
│   └── Layout.jsx       # Layout principal
├── context/             # Contexto global da aplicação
│   └── AppContext.jsx   # Estado global e ações
├── types/               # Definições de tipos
│   └── index.js         # Enums e constantes
├── App.jsx              # Componente principal
└── main.jsx             # Ponto de entrada
```

## 💾 Persistência de Dados

O sistema utiliza **Local Storage** para persistir os dados localmente no navegador. Isso significa que:

- Os dados são mantidos entre sessões
- Não há necessidade de backend para demonstração
- Os dados são específicos por navegador/dispositivo

### Dados Iniciais

O sistema vem pré-configurado com dados de exemplo:
- 3 CCPS de diferentes estados (SP, RJ, MG)
- 3 veterinários responsáveis
- Operações e salas com diferentes status de validação

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- **Context API** para estado global
- **useReducer** para lógica complexa de estado
- Persistência automática no Local Storage

### Sistema de Notificações
- Notificações automáticas para ações do usuário
- Auto-remoção após 5 segundos
- Diferentes tipos: sucesso, erro, aviso, informação

### Responsividade
- Design responsivo para desktop e mobile
- Menu lateral colapsável em dispositivos móveis
- Componentes adaptáveis a diferentes tamanhos de tela

## 📱 Uso do Sistema

### 1. Dashboard
- Visualize estatísticas gerais
- Acesse ações rápidas
- Monitore atividades recentes

### 2. Gerenciar CCPS
- Navegue pela lista de CCPS
- Use a busca para encontrar CCPS específicos
- Clique em "Validar Documentos" para iniciar validação

### 3. Validação de Documentos
- **Aba Operações**: Aprove/rejeite processos operacionais
- **Aba Salas**: Valide instalações físicas
- Adicione observações como avaliador
- Use os botões de ação para definir status

### 4. Fluxo de Validação
1. Selecione um CCPS da lista
2. Acesse o painel de validação
3. Revise operações e salas
4. Adicione observações quando necessário
5. Aprove, rejeite ou marque como "em análise"
6. O sistema salva automaticamente as alterações

## 🎨 Interface do Usuário

### Cores e Tema
- **Verde**: Cor principal do MAPA, usada para aprovações
- **Vermelho**: Rejeições e alertas
- **Amarelo**: Itens pendentes ou em análise
- **Azul**: Informações e navegação

### Componentes Principais
- **Cards**: Exibição de informações organizadas
- **Badges**: Status e categorias
- **Botões**: Ações primárias e secundárias
- **Formulários**: Entrada de dados e observações

## 🔒 Considerações de Segurança

Para uso em produção, considere implementar:
- Autenticação de usuários
- Autorização baseada em perfis
- Criptografia de dados sensíveis
- Auditoria de ações
- Backup de dados

## 🚀 Deploy em Produção

### Build de Produção
```bash
npm run build
```

### Hospedagem
O sistema pode ser hospedado em:
- Netlify
- Vercel
- GitHub Pages
- Servidor web tradicional (Apache, Nginx)

### Variáveis de Ambiente
Para produção, configure:
- URLs de API (se houver backend)
- Chaves de autenticação
- Configurações específicas do ambiente

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os logs do navegador (F12)
3. Teste em modo de desenvolvimento
4. Verifique a compatibilidade do navegador

## 📄 Licença

Este sistema foi desenvolvido especificamente para o MAPA e deve ser usado conforme as diretrizes da organização.

---

**Desenvolvido com ❤️ para o MAPA - Ministério da Agricultura, Pecuária e Abastecimento**


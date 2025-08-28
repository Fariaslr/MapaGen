import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CcpsList from './components/CcpsList';
import ValidationPanel from './components/ValidationPanel';
import VeterinariosList from './components/VeterinariosList';
import './App.css';

function AppContent() {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onViewChange={handleViewChange} />;
      case 'ccps':
        return <CcpsList onViewChange={handleViewChange} />;
      case 'validacao':
        return <ValidationPanel />;
      case 'veterinarios':
        return <VeterinariosList />;
      case 'configuracoes':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configurações</h2>
            <p className="text-gray-600">Funcionalidade em desenvolvimento</p>
          </div>
        );
      default:
        return <Dashboard onViewChange={handleViewChange} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  FileCheck, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = ({ onViewChange }) => {
  const { state, actions } = useApp();
  const stats = actions.getStats();
  const recentActivities = actions.getRecentActivities();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovado':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejeitado':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'em_analise':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      aprovado: 'bg-green-50 text-green-700 border-green-200',
      rejeitado: 'bg-red-50 text-red-700 border-red-200',
      em_analise: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      pendente: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    const labels = {
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
      em_analise: 'Em Análise',
      pendente: 'Pendente'
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-2">Visão geral do sistema de validação MAPA</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total CCPS
            </CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.totalCcps}</div>
            <p className="text-xs text-gray-500 mt-1">
              Sistema ativo
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.pendentes}</div>
            <p className="text-xs text-gray-500 mt-1">
              Aguardando validação
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Aprovados
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.aprovados}</div>
            <p className="text-xs text-gray-500 mt-1">
              Taxa: {stats.totalCcps > 0 ? Math.round((stats.aprovados / stats.totalCcps) * 100) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Em Análise
            </CardTitle>
            <FileCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stats.emAnalise}</div>
            <p className="text-xs text-gray-500 mt-1">
              Sendo processados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-gray-600" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.ccps}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma atividade recente
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-gray-600" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700"
                onClick={() => onViewChange('validacao')}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Iniciar Nova Validação
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onViewChange('ccps')}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Gerenciar CCPS
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onViewChange('veterinarios')}
              >
                Consultar Veterinários
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;


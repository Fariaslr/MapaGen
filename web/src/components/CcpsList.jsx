import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building2, 
  Search, 
  MapPin, 
  User, 
  Calendar,
  Eye,
  Edit,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const CcpsList = ({ onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { state, actions } = useApp();

  const filteredCcps = state.ccpsList.filter(ccps =>
    ccps.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ccps.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ccps.cnpj.includes(searchTerm)
  );

  const handleSelectCcps = (ccps) => {
    actions.setSelectedCcps(ccps);
    onViewChange('validacao');
  };

  const getStatusBadge = (status) => {
    const variants = {
      ativo: 'bg-green-50 text-green-700 border-green-200',
      pendente: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      em_analise: 'bg-blue-50 text-blue-700 border-blue-200',
      inativo: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    const labels = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      em_diligencia: 'Em Diligencia',
      inativo: 'Inativo'
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">CCPS Cadastrados</h2>
          <p className="text-gray-600 mt-2">Gerencie os Centros de Controle de Processamento de Sêmen</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo CCPS
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por nome, cidade ou CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de CCPS */}
      <div className="grid gap-6">
        {filteredCcps.map((ccps) => (
          <Card key={ccps.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start space-x-3">
                  <Building2 className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <CardTitle className="text-xl">{ccps.nome}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">CNPJ: {ccps.cnpj}</p>
                  </div>
                </div>
                {getStatusBadge(ccps.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{ccps.endereco}</p>
                    <p className="text-xs text-gray-500">{ccps.cidade}, {ccps.estado} - {ccps.cep}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{ccps.veterinario.nome}</p>
                    <p className="text-xs text-gray-500">CRMV: {ccps.veterinario.crmv}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {ccps.codigoAprovado || 'Não aprovado'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Válido até: {formatDate(ccps.dataValidade)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSelectCcps(ccps)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  onClick={() => handleSelectCcps(ccps)}
                >
                  Validar Documentos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCcps.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum CCPS encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os termos de pesquisa ou cadastre um novo CCPS.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CcpsList;


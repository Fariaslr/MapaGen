import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Search, 
  Mail, 
  Phone, 
  Calendar,
  Building2,
  Eye,
  Edit,
  Plus
} from 'lucide-react';

const VeterinariosList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para demonstração
  const veterinarios = [
    {
      id: '1',
      nome: 'Dr. João Silva',
      crmv: 'SP-12345',
      cpf: '123.456.789-00',
      dataNascimento: '1980-05-15',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-9999',
      ccpsList: [
        { nome: 'CCPS São Paulo Centro', status: 'ativo' },
        { nome: 'CCPS São Paulo Sul', status: 'pendente' }
      ]
    },
    {
      id: '2',
      nome: 'Dra. Maria Santos',
      crmv: 'RJ-67890',
      cpf: '987.654.321-00',
      dataNascimento: '1975-08-22',
      email: 'maria.santos@email.com',
      telefone: '(21) 88888-8888',
      ccpsList: [
        { nome: 'CCPS Rio de Janeiro Norte', status: 'ativo' }
      ]
    },
    {
      id: '3',
      nome: 'Dr. Carlos Oliveira',
      crmv: 'MG-11111',
      cpf: '456.789.123-00',
      dataNascimento: '1985-12-10',
      email: 'carlos.oliveira@email.com',
      telefone: '(31) 77777-7777',
      ccpsList: [
        { nome: 'CCPS Belo Horizonte', status: 'EM_DELIGENCIA' }
      ]
    }
  ];

  const filteredVeterinarios = veterinarios.filter(vet =>
    vet.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.crmv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      em_deligencia: 'Em Deligência',
      inativo: 'Inativo'
    };

    return (
      <Badge variant="outline" className={variants[status]} size="sm">
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Veterinários</h2>
          <p className="text-gray-600 mt-2">Gerencie os veterinários responsáveis pelos CCPS</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Veterinário
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por nome, CRMV ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Veterinários */}
      <div className="grid gap-6">
        {filteredVeterinarios.map((veterinario) => (
          <Card key={veterinario.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{veterinario.nome}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">CRMV: {veterinario.crmv}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {veterinario.ccpsList.length} CCPS
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-600">{veterinario.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-sm text-gray-600">{veterinario.telefone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Idade</p>
                    <p className="text-sm text-gray-600">
                      {calculateAge(veterinario.dataNascimento)} anos
                    </p>
                  </div>
                </div>
              </div>

              {/* CCPS Associados */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Building2 className="h-4 w-4 mr-1" />
                  CCPS Responsável
                </h4>
                <div className="flex flex-wrap gap-2">
                  {veterinario.ccpsList.map((ccps, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
                      <span className="text-sm">{ccps.nome}</span>
                      {getStatusBadge(ccps.status)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
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
                >
                  Ver CCPS
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVeterinarios.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum veterinário encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os termos de pesquisa ou cadastre um novo veterinário.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VeterinariosList;


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileCheck, 
  Building2, 
  Settings, 
  Image,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Upload,
  Eye
} from 'lucide-react';
import { StatusValidacao } from '../types';
import { useApp } from '../context/AppContext';

const ValidationPanel = () => {
  const [activeTab, setActiveTab] = useState('operacoes');
  const { state, actions } = useApp();

  // Se não há CCPS selecionado, mostrar mensagem
  if (!state.selectedCcps) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum CCPS selecionado
        </h3>
        <p className="text-gray-600">
          Selecione um CCPS na lista para iniciar a validação.
        </p>
      </div>
    );
  }

  const ccpsData = state.selectedCcps;
  const operacoes = state.operacoes[ccpsData.id] || {};
  const salas = state.salas[ccpsData.id] || [];

  const handleOperacaoChange = (campo, valor, dataAprovacao = null) => {
    const updates = {
      [campo]: valor,
      [dataAprovacao]: valor ? new Date().toISOString().split('T')[0] : null
    };
    actions.updateOperacao(ccpsData.id, updates);
  };

  const handleSalaStatusChange = (salaId, novoStatus, observacao = '') => {
    const updates = {
      statusValidacao: novoStatus,
      observacaoAvaliador: observacao,
      dataUltimaValidacao: new Date().toISOString().split('T')[0]
    };
    actions.updateSala(ccpsData.id, salaId, updates);
  };

  const handleObservacaoChange = (salaId, observacao) => {
    const updates = { observacaoAvaliador: observacao };
    actions.updateSala(ccpsData.id, salaId, updates);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case StatusValidacao.APROVADO:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case StatusValidacao.REJEITADO:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case StatusValidacao.EM_DELIGENCIA:
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      [StatusValidacao.APROVADO]: 'bg-green-50 text-green-700 border-green-200',
      [StatusValidacao.REJEITADO]: 'bg-red-50 text-red-700 border-red-200',
      [StatusValidacao.EM_DELIGENCIA]: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      [StatusValidacao.PENDENTE]: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    const labels = {
      [StatusValidacao.APROVADO]: 'Aprovado',
      [StatusValidacao.REJEITADO]: 'Rejeitado',
      [StatusValidacao.EM_DELIGENCIA]: 'Em Deligência',
      [StatusValidacao.PENDENTE]: 'Pendente'
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const OperacaoItem = ({ label, campo, dataAprovacao }) => (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {operacoes[campo] ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <p className="font-medium">{label}</p>
              {operacoes[dataAprovacao] && (
                <p className="text-sm text-gray-500">
                  Aprovado em: {new Date(operacoes[dataAprovacao]).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={operacoes[campo] ? "default" : "outline"}
              onClick={() => handleOperacaoChange(campo, true, dataAprovacao)}
              className={operacoes[campo] ? "bg-green-600 hover:bg-green-700" : ""}
            >
              Aprovar
            </Button>
            <Button
              size="sm"
              variant={!operacoes[campo] ? "destructive" : "outline"}
              onClick={() => handleOperacaoChange(campo, false, dataAprovacao)}
            >
              Rejeitar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Validação de Documentos</h2>
        <p className="text-gray-600 mt-2">Avalie e valide documentos e instalações do CCPS</p>
      </div>

      {/* Informações do CCPS */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Building2 className="h-6 w-6 text-green-600" />
            <div>
              <CardTitle>{ccpsData.nome}</CardTitle>
              <p className="text-sm text-gray-600">CNPJ: {ccpsData.cnpj}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Endereço</p>
              <p className="text-sm text-gray-600">{ccpsData.endereco}, {ccpsData.cidade}, {ccpsData.estado}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Veterinário Responsável</p>
              <p className="text-sm text-gray-600">{ccpsData.veterinario.nome} - {ccpsData.veterinario.crmv}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Validação */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="operacoes" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Operações
          </TabsTrigger>
          <TabsTrigger value="salas" className="flex items-center">
            <Building2 className="h-4 w-4 mr-2" />
            Salas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                Validação de Operações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OperacaoItem 
                label="Arquivos de Processos Tecnológicos"
                campo="arquivosProcessosTecnologicos"
                dataAprovacao="dataAprovacaoArquivos"
              />
              <OperacaoItem 
                label="Fluxo Operacional Definido"
                campo="fluxoOperacionalDefinido"
                dataAprovacao="dataAprovacaoFluxo"
              />
              <OperacaoItem 
                label="Medidas Higiênico-Sanitárias - Funcionários"
                campo="medidasHigienicoSanitariasFuncionarios"
                dataAprovacao="dataAprovacaoHigieneFunc"
              />
              <OperacaoItem 
                label="Medidas Higiênico-Sanitárias - Visitantes"
                campo="medidasHigienicoSanitariasVisitantes"
                dataAprovacao="dataAprovacaoHigieneVisitantes"
              />
              <OperacaoItem 
                label="Controle de Pragas"
                campo="controlePragas"
                dataAprovacao="dataAprovacaoControlePragas"
              />
              <OperacaoItem 
                label="Sistema de Escoamento"
                campo="sistemaEscoamento"
                dataAprovacao="dataAprovacaoEscoamento"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salas" className="space-y-4">
          {salas.map((sala) => (
            <Card key={sala.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2" />
                      {sala.tipo.nomeTipo}
                    </CardTitle>
                    {sala.dataUltimaValidacao && (
                      <p className="text-sm text-gray-500 mt-1">
                        Última validação: {new Date(sala.dataUltimaValidacao).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(sala.statusValidacao)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Documentos e Fotos */}
                <div>
                  <h4 className="font-medium mb-3">Documentos e Fotos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {sala.planta && (
                      <div className="flex items-center space-x-2 p-2 border rounded">
                        <FileCheck className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Planta</span>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    {[sala.foto1, sala.foto2, sala.foto3].filter(Boolean).map((foto, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                        <Image className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Foto {index + 1}</span>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Observações */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Observação do Veterinário</label>
                    <Textarea 
                      value={sala.observacaoVeterinario}
                      readOnly
                      className="mt-1 bg-gray-50"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Observação do Avaliador</label>
                    <Textarea 
                      value={sala.observacaoAvaliador}
                      onChange={(e) => handleObservacaoChange(sala.id, e.target.value)}
                      className="mt-1"
                      rows={3}
                      placeholder="Adicione suas observações..."
                    />
                  </div>
                </div>

                {/* Ações de Validação */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button
                    onClick={() => handleSalaStatusChange(sala.id, StatusValidacao.APROVADO, sala.observacaoAvaliador)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleSalaStatusChange(sala.id, StatusValidacao.REJEITADO, sala.observacaoAvaliador)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSalaStatusChange(sala.id, StatusValidacao.EM_DELIGENCIA, sala.observacaoAvaliador)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Em Deligência
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValidationPanel;


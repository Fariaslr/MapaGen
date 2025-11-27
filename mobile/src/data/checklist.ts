export const checkList = [
  {
    title: "📄 Capítulo I – Documentos Obrigatórios",
    sections: [
      {
        title: "1. Documentação da Empresa",
        items: [
          { title: "Contrato Social ou Ata de Constituição", done: false, route: "/documentos/empresa/contrato" },
          { title: "Cadastro Nacional da Pessoa Jurídica (CNPJ)", done: false, route: "/documentos/empresa/cnpj" },
          { title: "Inscrição Estadual", done: false, route: "/documentos/empresa/inscricao" },
        ],
      },
      {
        title: "2. Responsabilidade Técnica",
        items: [
          { title: "ART emitida pelo CRMV", done: false, route: "/documentos/tecnica/art" },
        ],
      },
      {
        title: "3. Planta e Memorial",
        items: [
          { title: "Planta-baixa com todas as instalações", done: true, route: "/documentos/planta/baixa" },
          { title: "Planta de localização com coordenadas", done: false, route: "/documentos/planta/localizacao" },
          { title: "Memorial descritivo", done: false, route: "/documentos/planta/memorial" },
        ],
      },
    ],
  },
  {
    title: "🏗️ Capítulo II – Exigências Físicas",
    sections: [
      {
        title: "1. Condições Gerais",
        items: [
          { title: "Cerca perimetral ou barreira", done: false, route: "/exigencias/gerais/cerca" },
          { title: "Localização livre de alagamentos", done: false, route: "/exigencias/gerais/localizacao" },
        ],
      },
      {
        title: "2. Instalações Obrigatórias",
        items: [
          { title: "Sala de Manipulação de Sêmen", done: false, route: "/exigencias/laboratorio/semen" },
          { title: "Sala de Lavagem e Esterilização", done: false, route: "/exigencias/laboratorio/lavagem" },
          { title: "Área de coleta de sêmen", done: false, route: "/exigencias/coleta/area" },
          { title: "Alojamento dos doadores", done: false, route: "/exigencias/alojamento" },
          { title: "Instalação administrativa", done: false, route: "/exigencias/administrativo" },
          { title: "Vestiários e Banheiros", done: false, route: "/exigencias/vestiario" },
          { title: "Armazenamento de sêmen", done: false, route: "/exigencias/armazenamento" },
        ],
      },
    ],
  },
];
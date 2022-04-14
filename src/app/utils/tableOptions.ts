const tableOptions = {
  textLabels: {
    body: {
      noMatch: "Desculpe, nenhum registro foi encontrado",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column: any) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Próxima página",
      previous: "Page anterior",
      rowsPerPage: "Linhas por página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Download CSV",
      print: "Imprimir",
      viewColumns: "Ver colunas",
      filterTable: "Filtrar tabela",
    },
    filter: {
      all: "Todos",
      title: "FILTROS",
      reset: "RESET",
    },
    viewColumns: {
      title: "Mostrar colunas",
      titleAria: "Exibir/ocultar colunas",
    },
    selectedRows: {
      text: "linha(s) selecionada",
      delete: "Apagar",
      deleteAria: "Apagar linhas selecionadas",
    },
  },
};

export default tableOptions;

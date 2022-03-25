const getErrorMessage = (apiError: any) => {
  if (!apiError) return "";
  else {
    const error = apiError?.data?.data[0].message ?? "Servidor indisponivel";
    return error;
  }
};

export default getErrorMessage;

import {
  parameterPlainToParameterViewModel,
  rowToParameterPlain,
} from "modules/utils/excel-templates/parameter-template";
import { useCreateParameterMutation } from "modules/automation/services/parameter-service";

const useParametersImport = () => {
  const [createParameter, { isLoading }] = useCreateParameterMutation();

  const importData = async (data: any, groupId: string) => {
    const parametersAsPlain = rowToParameterPlain(data);
    const parameters = parameterPlainToParameterViewModel(
      parametersAsPlain,
      groupId
    );
    for (let i = 0; i < parameters.length; i++) {
      await createParameter(parameters[i]).unwrap();
    }
  };

  return {
    importData,
    isLoading,
  };
};

export default useParametersImport;

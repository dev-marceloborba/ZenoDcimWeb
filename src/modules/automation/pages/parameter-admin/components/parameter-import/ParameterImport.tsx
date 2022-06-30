import ImportButton from "modules/shared/components/ImportButton";
import {
  customRules,
  parameterPlainToParameterViewModel,
  rowToParameterPlain,
} from "modules/utils/excel-templates/parameter-template";

export default function ParameterImport() {
  const handleImport = (data: any) => {
    console.log(data);
    const result = rowToParameterPlain(data);
    const parameters = parameterPlainToParameterViewModel(result, "");
    console.log(parameters);
  };
  return <ImportButton onDataReceived={handleImport} />;
}

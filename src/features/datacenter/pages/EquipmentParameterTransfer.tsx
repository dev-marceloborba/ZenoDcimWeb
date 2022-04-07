import React, { useState, useEffect } from "react";
import HeroContainer from "app/components/HeroContainer";
import PageTitle from "app/components/PageTitle";
import TransferList, { TransferListItem } from "app/components/TransferList";

import {
  useCreateMultipleEquipmentParametersMutation,
  useListAllEquipmentsQuery,
} from "app/services/datacenter";
import AutoCompleteDropdown from "app/components/AutocompleteDropdown";
import { EquipmentParameterResponse } from "app/models/data-center.model";

const EquipmentParameterTransfer: React.FC = () => {
  const { data: equipments, isLoading } = useListAllEquipmentsQuery();
  const [createMultipleParameters] =
    useCreateMultipleEquipmentParametersMutation();

  const [sourceEquipment, setSourceEquipment] = useState<string | null>(null);
  const [sourceInputValue, setSourceInputValue] = React.useState("");

  const [targetEquipment, setTargetEquipment] = useState<string | null>(null);
  const [targetInputValue, setTargetInputValue] = React.useState("");

  const [leftParameters, setLeftParameters] =
    useState<EquipmentParameterResponse[]>();
  const [rightParameters, setRightParameters] =
    useState<EquipmentParameterResponse[]>();

  const handleChangeSourceEquipment = (source: string) => {
    setSourceEquipment(source);
  };

  const handleChangeTargetEquipment = (target: string) => {
    setTargetEquipment(target);
  };

  const handleSaveParameters = async (transferList: TransferListItem[]) => {
    const parameters =
      equipments?.find((x) => x.component === sourceEquipment)
        ?.equipmentParameters ?? [];
    let selectedParameters: EquipmentParameterResponse[] = [];

    parameters.forEach((value) => {
      const item = transferList.find((x) => value.id === x.id);
      if (item) {
        selectedParameters.push(value);
      }
    });

    const result = await createMultipleParameters({
      parameters: selectedParameters,
    }).unwrap();

    console.log(result);
  };

  useEffect(() => {
    const equipment = equipments?.find((x) => x.component === sourceEquipment);
    setLeftParameters(equipment?.equipmentParameters ?? []);
  }, [sourceEquipment, equipments, setLeftParameters]);

  useEffect(() => {
    const equipment = equipments?.find((x) => x.component === targetEquipment);
    setRightParameters(equipment?.equipmentParameters ?? []);
  }, [targetEquipment, equipments, setRightParameters]);

  return (
    <HeroContainer>
      <PageTitle>Transferência de parâmetros</PageTitle>
      <AutoCompleteDropdown
        label="Equipamento de origem"
        name="originEquipment"
        options={equipments?.map((equipment) => equipment.component) ?? []}
        value={sourceEquipment}
        handleValue={handleChangeSourceEquipment}
        inputValue={sourceInputValue}
        handleInputValue={setSourceInputValue}
        sx={{ mt: 2 }}
      />
      <AutoCompleteDropdown
        label="Equipamento de destino"
        name="targetEquipment"
        options={equipments?.map((equipment) => equipment.component) ?? []}
        value={targetEquipment}
        handleValue={handleChangeTargetEquipment}
        inputValue={targetInputValue}
        handleInputValue={setTargetInputValue}
        sx={{ mt: 2 }}
      />
      <TransferList
        sx={{ mt: 2 }}
        leftItems={
          leftParameters?.map((parameter) => ({
            id: parameter.id,
            label: parameter.name,
          })) ?? []
        }
        rightItems={
          rightParameters?.map((parameter) => ({
            id: parameter.id,
            label: parameter.name,
          })) ?? []
        }
        onSave={handleSaveParameters}
      />
    </HeroContainer>
  );
};

export default EquipmentParameterTransfer;

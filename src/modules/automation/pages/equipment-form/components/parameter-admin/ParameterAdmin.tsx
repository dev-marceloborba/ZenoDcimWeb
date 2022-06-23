import React from "react";
import AccessButton from "modules/shared/components/AccessButton";
import Row from "modules/shared/components/Row";
import ParameterList from "modules/automation/pages/equipment-form/components/parameter-list/ParameterList";

//icons
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

const ParameterAdmin: React.FC = () => {
  return (
    <>
      <Row>
        <AccessButton
          startIcon={<ThermostatIcon />}
          label="Associar parâmetro"
          to={"/zeno"}
        />
        <AccessButton
          startIcon={<ThermostatIcon />}
          label=" Novo alarme"
          to={"/zeno"}
        />
        <AccessButton
          startIcon={<SmsFailedIcon />}
          label="Nova regra"
          to={"/zeno"}
        />
        <AccessButton
          startIcon={<ThermostatIcon />}
          label="Novo parâmetro"
          to={"/zeno"}
        />
      </Row>
      <ParameterList />
    </>
  );
};

export default ParameterAdmin;

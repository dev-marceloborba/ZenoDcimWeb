import React from "react";
import AccessButton from "modules/shared/components/AccessButton";
import Row from "modules/shared/components/Row";
//icons
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import ParameterList from "../parameter-list/ParameterList";

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

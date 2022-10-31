import React from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Row from "modules/shared/components/Row";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Column from "modules/shared/components/Column";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import LabelTabs from "modules/shared/components/LabelTabs";
import {
  TabContextProvider,
  useTabContext,
} from "modules/shared/components/TabContext";
import TabPanel from "modules/shared/components/TabPanel";
import InDevelopMessage from "modules/shared/components/InDevelopMessage";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";

const UserSettings: React.FC = () => {
  return (
    <HeroContainer title="Configurações">
      <TabContextProvider>
        <LabelTabs items={["Usuário", "Sistema"]} />
        <Card
          sx={{
            padding: "8px 24px",
          }}
        >
          <UserPanel />
          <SystemPanel />
        </Card>
      </TabContextProvider>
    </HeroContainer>
  );
};

const UserPanel: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={0} value={tabIndex}>
      <UserAdmin />
    </TabPanel>
  );
};

const SystemPanel: React.FC = () => {
  const { tabIndex } = useTabContext();
  return (
    <TabPanel index={1} value={tabIndex}>
      <Row sx={{ justifyContent: "space-between" }}>
        <Typography>Modo escuro</Typography>
        <Switch />
      </Row>
      <InDevelopMessage />
    </TabPanel>
  );
};

export default UserSettings;

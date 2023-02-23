import { useState } from "react";
import HeroContainer from "modules/shared/components/HeroContainer";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import AlarmIndicator, {
  AlarmStatus,
} from "modules/automation/components/alarm-indicator/AlarmIndicator";
import Column from "modules/shared/components/Column";

export default function UserHelp() {
  const [showAlarmDocs, setShowAlarmDocs] = useState(false);
  const handleShowAlarmDocs = () => {
    setShowAlarmDocs(true);
  };

  const hideOtherDocs = () => {
    setShowAlarmDocs(false);
  };

  return (
    <HeroContainer title="Ajuda">
      <Grid container columnSpacing={2}>
        <Grid item md={6}>
          <Card sx={{ py: 2, px: 1 }}>
            <TreeView
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
              }}
            >
              <TreeItem nodeId="1" label="Automação">
                <TreeItem
                  nodeId="2"
                  label="Alarmes"
                  onClick={handleShowAlarmDocs}
                />
              </TreeItem>
            </TreeView>
          </Card>
        </Grid>

        <Grid item md={6}>
          <Card sx={{ py: 2, px: 1 }}>
            {showAlarmDocs && (
              <Column>
                <p>
                  Alarmes são uma representação visual relacionados a parâmetros
                  que tiveram seus <strong>setpoints atingidos.</strong>
                  <span>
                    {" "}
                    São classificados em três diferentes severidades:
                  </span>
                </p>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <AlarmIndicator
                      description="Severidade 1"
                      status="danger"
                    />
                    <p>
                      O alarme de severidade 1 é considerado o maior nível de
                      criticidade de um parâmetro.
                    </p>
                    <p>
                      É representado por um quadrado vermelho com o valor 1
                      centralizado.
                    </p>
                  </li>
                  <li>
                    <AlarmIndicator description="Severidade 2" status="alert" />
                    <p>
                      O alarme de severidade 2 é considerado o nível médio de
                      criticidade de um parâmetro.
                    </p>
                    <p>
                      É representado por um triângulo amarelo com o valor 2
                      centralizado.
                    </p>
                  </li>
                  <li>
                    <AlarmIndicator
                      description="Severidade 3"
                      status="critical"
                    />
                    <p>
                      O alarme de severidade 3 é considerado o nível baixo de
                      criticidade de um parâmetro.
                    </p>
                    <p>
                      É representado por um triângulo invertido laranja com o
                      valor 3 centralizado.
                    </p>
                  </li>
                </ul>
              </Column>
            )}
          </Card>
        </Grid>
      </Grid>
    </HeroContainer>
  );
}

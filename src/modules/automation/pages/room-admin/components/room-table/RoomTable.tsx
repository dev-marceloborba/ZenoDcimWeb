import React from "react";
import DataTable from "modules/shared/components/DataTable";
import Row from "modules/shared/components/Row";
import Loading from "modules/shared/components/Loading";
import ButtonLink from "modules/shared/components/ButtonLink";
import { RoomModel } from "modules/datacenter/models/datacenter-model";
import {
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
} from "modules/datacenter/services/room-service";
import compositePathRoute from "modules/utils/compositePathRoute";
import { HomePath } from "modules/paths";
import { AutomationPath } from "modules/home/routes/paths";
import { RoomFormPath } from "modules/automation/routes/paths";
import { useToast } from "modules/shared/components/ToastProvider";

const RoomTable: React.FC = () => {
  const { data: rooms, isLoading } = useFindAllRoomsQuery();
  const [deleteRoom] = useDeleteRoomMutation();
  const toast = useToast();

  const handleDeleteSelection = async (rows: RoomModel[]) => {
    for (let i = 0; i < rows.length; i++) {
      await deleteRoom(rows[i].id).unwrap;
    }
    toast.open({ message: "Andar(es) excluído(s) com sucesso" });
  };

  return (
    <>
      <Row
        sx={{
          alignItems: "center",
          mt: 2,
          mb: 2,
          "& .MuiTextField-root": {
            maxWidth: "240px",
          },
          "& .MuiTextField-root:first-child": {
            marginRight: "16px",
          },
        }}
      >
        <ButtonLink
          variant="contained"
          to={compositePathRoute([HomePath, AutomationPath, RoomFormPath])}
          sx={{ marginLeft: "auto" }}
        >
          Criar sala
        </ButtonLink>
      </Row>
      <DataTable
        title="Salas"
        columns={columns}
        rows={
          rooms?.map((room) => ({
            id: room.id,
            name: room.name,
            floor: room.floor?.name,
          })) ?? []
        }
        options={{
          onRowClick: (row) => console.log(row),
          onDeleteSelection: handleDeleteSelection,
        }}
      />
      <Loading open={isLoading} />
    </>
  );
};

export default RoomTable;

const columns = [
  {
    name: "name",
    label: "Sala",
  },
  {
    name: "floor",
    label: "Andar",
  },
];

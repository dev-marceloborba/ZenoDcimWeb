import React from "react";
import DataTable, {
  ColumnHeader,
} from "modules/shared/components/datatableV2/DataTable";
import Row from "modules/shared/components/Row";
import Loading from "modules/shared/components/Loading";
import ButtonLink from "modules/shared/components/ButtonLink";
import {
  RoomModel,
  RoomViewModel,
} from "modules/datacenter/models/datacenter-model";
import {
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
  useFindRoomByIdMutation,
} from "modules/datacenter/services/room-service";
import { useToast } from "modules/shared/components/ToastProvider";
import { datacenterPaths } from "modules/datacenter/routes/paths";

const RoomTable: React.FC = () => {
  const { data: rooms, isLoading } = useFindAllRoomsQuery();
  const [createRoom, { isLoading: isLoadingCreate }] = useCreateRoomMutation();
  const [findRoom, { isLoading: isLoadingFetch }] = useFindRoomByIdMutation();
  const [deleteRoom, { isLoading: isLoadingDelete }] = useDeleteRoomMutation();
  const toast = useToast();

  const handleDeleteSelection = async (rows: RoomModel[]) => {
    for (let i = 0; i < rows.length; i++) {
      await deleteRoom(rows[i].id).unwrap;
    }
    toast.open({ message: "Andar(es) excluído(s) com sucesso" });
  };

  const handleDuplicateItem = async (room: RoomModel) => {
    const item = await findRoom(room.id).unwrap();
    const duplicate: RoomViewModel = {
      ...item,
      name: room.name + " - cópia",
    };
    try {
      await createRoom(duplicate).unwrap();
      toast.open({ message: "Sala duplicada" });
    } catch (error) {
      console.log(error);
      toast.open({ message: "Erro ao criar sala", severity: "error" });
    }
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
          to={datacenterPaths.roomForm.shortPath}
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
          onCopyItem: handleDuplicateItem,
          userPreferenceTable: "roomTable",
        }}
      />
      <Loading
        open={isLoading || isLoadingCreate || isLoadingDelete || isLoadingFetch}
      />
    </>
  );
};

export default RoomTable;

const columns: ColumnHeader[] = [
  {
    name: "name",
    label: "Sala",
  },
  {
    name: "floor",
    label: "Andar",
  },
];

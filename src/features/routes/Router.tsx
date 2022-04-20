import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "features/authentication/Login";
import Zeno from "features/home/Zeno";

//pages
import Admin from "features/user/Admin";
import CreateUser from "features/user/CreateUser";
import EditUser from "features/user/EditUser";
import RackList from "features/rack/RackList";
import CreateRack from "features/rack/CreateRack";
import ClpList from "features/automation/ClpList";
import NewClp from "features/automation/NewClp";
import ModbusTagList from "features/automation/ModbusTagList";
import NewModbusTag from "features/automation/NewModbusTag";
import RackFloorOverview from "features/rack/RackFloorOverview";
import RackDetails from "features/rack/RackDetails";
import AlarmList from "features/automation/AlarmList";
import CompanyList from "features/company/CompanyList";
import NewCompany from "features/company/NewCompany";
import Etc from "features/automation/pages/Etc";
import EtcDetails from "features/automation/pages/EtcDetails";
import FireSystem from "features/automation/pages/FireSystem";
import FireSystemDetails from "features/automation/pages/FireSystemDetails";
import AccessControl from "features/automation/pages/AccessControl";
import FireSystemEvents from "features/automation/pages/FireSystemEvents";
import EquipmentConectivity from "features/automation/pages/EquipmentConectivity";
import AutomationRegisterManagement from "features/automation/pages/AutomationRegisterManagement";
import NewEnergyEquipment from "features/automation/pages/NewEnergyEquipment";
import RackEquipmentConnectivity from "features/automation/pages/RackEquipmentConnectivity";
import FlowDiagramEditor from "features/automation/components/FlowDiagramEditor";
import NewBuilding from "features/automation/pages/NewBuilding";
import UserSettings from "features/user/UserSettings";
import DataCenterManagement from "features/datacenter/pages/DataCenterManagement";
import RoomAdmin from "features/datacenter/pages/RoomAdmin";
import BuildingForm from "features/datacenter/components/BuilldingForm";
import RoomForm from "features/datacenter/components/RoomForm";
import FloorForm from "features/datacenter/components/FloorForm";
import EquipmentForm from "features/datacenter/components/EquipmentForm";
import EquipmentParameterForm from "features/automation/pages/EquipmentParameterForm";
import EquipmentParameterTransfer from "features/datacenter/pages/EquipmentParameterTransfer";
import EquipmentParameterGroupForm from "features/datacenter/components/EquipmentParameterGroupForm";
import ModalProvider from "app/hooks/useModal";

const Dashboard = React.lazy(() => import("features/dcim/Dashboard"));

export const MainRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/zeno/*" element={<Zeno />} />
      </Routes>
    </BrowserRouter>
  );
};

export const SubRoutes: React.FC = () => {
  return (
    <Suspense fallback={<h3>loading...</h3>}>
      <Routes>
        <Route path="/automation/etc" element={<Etc />} />
        <Route path="/automation/etc/details" element={<EtcDetails />} />
        <Route path="/automation/fire-system" element={<FireSystem />} />
        <Route
          path="/automation/fire-system/details"
          element={<FireSystemDetails />}
        />
        <Route
          path="/automation/fire-system/events"
          element={<FireSystemEvents />}
        />
        <Route
          path="automation/equipment-conectivity"
          element={<EquipmentConectivity />}
        />
        <Route
          path="automation/equipment-conectivity/rack"
          element={<RackEquipmentConnectivity />}
        />
        <Route path="/automation/access-control" element={<AccessControl />} />
        <Route
          path="/automation/management"
          element={<AutomationRegisterManagement />}
        />
        <Route
          path="/automation/management/equipment/:id"
          element={<NewEnergyEquipment />}
        />
        <Route
          path="/automation/management/building"
          element={<DataCenterManagement />}
        />
        <Route
          path="/automation/flow-diagram-editor"
          element={<FlowDiagramEditor />}
        />
        <Route path="/settings" element={<UserSettings />} />
        <Route
          path="/automation/management/building/new"
          element={<BuildingForm />}
        />
        <Route
          path="/automation/management/floor/new"
          element={<FloorForm />}
        />
        <Route path="/automation/management/room/new" element={<RoomForm />} />
        <Route
          path="/automation/management/equipment/new"
          element={<EquipmentForm />}
        />
        <Route
          path="/automation/management/equipment/parameter/form"
          element={<EquipmentParameterForm />}
        />
        <Route
          path="/automation/management/equipment/parameter/transfer"
          element={<EquipmentParameterTransfer />}
        />
        <Route
          path="/automation/management/equipment/parameter/group/form"
          element={
            <ModalProvider>
              <EquipmentParameterGroupForm />
            </ModalProvider>
          }
        />

        {/* <Route
          path="/automation/management/equipment/:equipmentId/parameter/:equipmentParameterId"
          element={<EquipmentParameterForm />}
        /> */}
        <Route path="/settings/new-user" element={<CreateUser />} />
        <Route path="/settings/edit-user" element={<EditUser />} />
        <Route path="/settings/new-company" element={<NewCompany />} />
        {/* <Route path="admin" element={<Admin />} />
                <Route path="admin/new" element={<CreateUser />} />
                <Route path="admin/edit" element={<EditUser />} />


                <Route path="companies" element={<CompanyList />} />
                <Route path="companies/new" element={<NewCompany />} />

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="racks" element={<RackList />} />
                <Route path="racks/new" element={<CreateRack />} />
                <Route path="racks/overview" element={<RackFloorOverview />} />
                <Route path="racks/details" element={<RackDetails />} />

                <Route path="clp/list" element={<ClpList />} />
                <Route path="clp/new" element={<NewClp />} />

                <Route path="modbus-tag/list" element={<ModbusTagList />} />
                <Route path="modbus-tag/new" element={<NewModbusTag />} />
                <Route path="automation/alarms/list" element={<AlarmList />} /> */}
      </Routes>
    </Suspense>
  );
};

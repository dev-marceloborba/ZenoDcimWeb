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

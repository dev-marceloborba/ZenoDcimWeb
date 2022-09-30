import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import { userPaths } from "./paths";
import UserDetails from "../pages/user-details/UserDetails";
import UserHelp from "../pages/user-help/UserHelp";
import CreateUser from "../pages/create-user/CreateUser";
import CompanyForm from "../pages/company-form/CompanyForm";
import UserGroupsPage from "../pages/user-groups-page/UserGroupsPage";

export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserAdmin />,
  },
  {
    path: userPaths.userDetails.fullPath,
    element: <UserDetails />,
  },
  {
    path: userPaths.userHelp.fullPath,
    element: <UserHelp />,
  },
  {
    path: userPaths.newUser.fullPath,
    element: <CreateUser />,
  },
  {
    path: userPaths.userEdit.fullPath,
    element: <CreateUser />,
  },
  {
    path: userPaths.companyForm.fullPath,
    element: <CompanyForm />,
  },
  {
    path: userPaths.groups.fullPath,
    element: <UserGroupsPage />,
  },
];

const UserRoutes: React.FC = () => useRoutes(userRoutes);

export default UserRoutes;

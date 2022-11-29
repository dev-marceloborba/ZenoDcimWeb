import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import { userPaths } from "./paths";
import UserDetails from "../pages/user-details/UserDetails";
import UserHelp from "../pages/user-help/UserHelp";
import CreateUser from "../pages/create-user/CreateUser";
import CompanyForm from "../pages/company-form/CompanyForm";
import UserGroupsPage from "../pages/user-groups-page/UserGroupsPage";
import UserPreferencies from "../components/user-preferencies/UserPreferencies";
import UserInfo from "../pages/user-info/UserInfo";

export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserAdmin />,
    title: "Usuários",
  },
  {
    path: userPaths.userDetails.fullPath,
    element: <UserDetails />,
    title: "Detalhes do usuário",
    parameter: "id",
  },
  {
    path: userPaths.userHelp.fullPath,
    element: <UserHelp />,
    title: "Ajuda",
  },
  {
    path: userPaths.newUser.fullPath,
    element: <CreateUser />,
    title: "Formulário de usuário",
  },
  {
    path: userPaths.userEdit.fullPath,
    element: <CreateUser />,
    title: "Editar usuário",
  },
  {
    path: userPaths.companyForm.fullPath,
    element: <CompanyForm />,
    title: "Formulário de empresa",
  },
  {
    path: userPaths.groups.fullPath,
    element: <UserGroupsPage />,
    title: "Grupos de usuário",
  },
  {
    path: userPaths.userPreferencies.fullPath,
    element: <UserPreferencies />,
    title: "Preferências de usuário",
  },
];

const UserRoutes = () => useRoutes(userRoutes);

export default UserRoutes;

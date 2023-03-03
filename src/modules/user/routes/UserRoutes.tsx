import { RouteObject, useRoutes } from "react-router-dom";
import UserAdmin from "modules/user/pages/user-admin/UserAdmin";
import { userPaths } from "./paths";
import UserHelp from "../pages/user-help/UserHelp";
import CompanyForm from "../pages/company-form/CompanyForm";
import UserGroupsPage from "../pages/user-groups-page/UserGroupsPage";
import UserPreferencies from "../components/user-preferencies/UserPreferencies";
import { useAuth } from "app/hooks/useAuth";
import { RegisterPermissions } from "../models/group.model";

export const userRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserAdmin />,
    title: "Usuários",
    validatePermission: (permission?: RegisterPermissions) => {
      if (permission) return permission.users === true;
      else return false;
    },
  },
  {
    path: userPaths.userHelp.fullPath,
    element: <UserHelp />,
    title: "Ajuda",
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
    validatePermission: (permission?: RegisterPermissions) => {
      if (permission) return permission.users === true;
      else return false;
    },
  },
  {
    path: userPaths.userPreferencies.fullPath,
    element: <UserPreferencies />,
    title: "Preferências de usuário",
  },
];

const UserRoutes = () => {
  const {
    userState: { permissions },
  } = useAuth();

  return useRoutes(
    userRoutes.filter((route) => {
      const isAllowed = route.validatePermission
        ? route.validatePermission(permissions?.registers)
        : true;
      return isAllowed ? route : null;
    })
  );
};

export default UserRoutes;

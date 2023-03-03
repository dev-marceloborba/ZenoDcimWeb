import { GroupModel } from "./group.model";
import { UserPreferenciesModel } from "./user-preferencies.model";

export interface User {
  id: string;
  name: string;
  email: string;
  permissions: GroupModel;
}

export interface AuthModel {
  id: string;
  user: User;
  token: string;
}

export enum EUserRole {
  ADMIN = 1,
  OPERATOR = 2,
  TECHNICIAN = 3,
  VIEW_ONLY = 4,
  EXTERNAL_CLIENT = 5,
}

export function getUserRoleInstance(value: string) {
  switch (value) {
    case "Administrador":
      return EUserRole.ADMIN;
    case "Operador":
      return EUserRole.OPERATOR;
    case "Técnico":
      return EUserRole.TECHNICIAN;
    case "Visualizador":
      return EUserRole.VIEW_ONLY;
    default:
      return EUserRole.EXTERNAL_CLIENT;
  }
}

export enum EUserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export function getUserStatusInstance(value: string) {
  if (value === "Inativo") {
    return 0;
  } else if (value === "Ativo") {
    return 1;
  } else {
    return 0;
  }
}

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: GroupModel;
  active: boolean;
  userPreferencies?: UserPreferenciesModel;
}

export type UsersModel = UserModel[];

export interface LoginViewModel {
  email: string;
  password: string;
}

export interface UserEditorModel {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  group?: GroupModel;
  active: boolean;
  userPreferencies?: UserPreferenciesModel;
  groupId: string;
  companyId: string;
}

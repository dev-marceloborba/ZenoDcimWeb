export interface User {
  name: string;
  email: string;
}

export interface AuthModel {
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

export enum EUserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  active: boolean;
}

export type UsersModel = UserModel[];

export type UserModelNormalized = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: string;
};

export interface LoginViewModel {
  email: string;
  password: string;
}

export interface UserViewModel {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  role: EUserRole;
  companyId: string;
}

export interface EditUserViewModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  active: EUserStatus;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthResponse {
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

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: EUserRole;
  active: boolean;
}

export type UsersResponse = UserResponse[];

export type UserResponseNormalized = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: string;
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  role: EUserRole;
  companyId: string;
}

export interface EditUserRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  groupId: string;
  active: EUserStatus;
}

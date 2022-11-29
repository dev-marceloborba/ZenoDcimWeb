export interface GroupModel extends CreateGroupViewModel {
  id: string;
}

export interface CreateGroupViewModel {
  name: string;
  description: string;
  actions: ActionPermissions;
  registers: RegisterPermissions;
  views: ViewPermissions;
  general: GeneralPermissions;
}

export interface UpdateGroupViewModel extends CreateGroupViewModel {
  id: string;
}

export type ActionPermissions = {
  editConnections: boolean;
  ackAlarms: boolean;
};

export type RegisterPermissions = {
  users: boolean;
  datacenter: boolean;
  alarms: boolean;
  notifications: boolean;
  parameters: boolean;
};

export type ViewPermissions = {
  alarms: boolean;
  parameters: boolean;
  equipments: boolean;
};

export type GeneralPermissions = {
  receiveEmail: boolean;
};

export type UserPermissions = {
  actions: {
    editConnections: boolean;
    ackAlarms: boolean;
  };
  registers: {
    users: boolean;
    datacenter: boolean;
    alarms: boolean;
    notifications: boolean;
    parameters: boolean;
  };
  views: {
    alarms: boolean;
    parameters: boolean;
    equipments: boolean;
  };
  general: {
    receiveEmail: boolean;
  };
};

export function getGroupIdFromName(name: string, groups: GroupModel[]) {
  if (groups.length === 0) return "";
  return groups.find((g) => g.name === name)?.id ?? "";
}

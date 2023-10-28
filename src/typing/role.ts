import { BaseData } from './base';

export type Role = BaseData & {
  roleId: number;
  roleName: string;
  roleKey: string;
  status: number;
  sort: number;
  admin: boolean;
};

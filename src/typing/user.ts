import { BaseData } from './base';

export type User = BaseData & {
  userId: number;
  userName: string;
  admin?: number;
  avator?: string;
  nickName?: string;
  status: 0 | 1;
  remark?: string;
  phonenumber?: string;
};

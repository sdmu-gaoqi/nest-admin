import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Base_Feature } from './base';
import { User_Feature } from './user';
import { Perm_Feature } from './perm';

@Entity('sys_role')
@Index('roleId', ['roleId'], { unique: true })
@Index('roleKey', ['roleKey'], { unique: true })
@Unique(['roleName', 'roleKey'])
export class Role_Feature extends Base_Feature {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column()
  private roleName: string;

  @Column()
  private roleKey: string;

  @Column({
    comment: '0禁用 1启用',
    default: 1,
  })
  status: number;

  @Column({ default: 0 })
  sort: number;

  @Column({ default: 0 })
  admin: number;

  @Column({ default: '' })
  desc: string;

  @ManyToMany(() => User_Feature)
  @JoinTable({ name: 'sys_role_user' })
  users: User_Feature[];

  @ManyToMany(() => Perm_Feature)
  @JoinTable({ name: 'sys_role_perm' })
  perms: Perm_Feature[];
}

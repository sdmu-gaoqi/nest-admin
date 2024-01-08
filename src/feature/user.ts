import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Base_Feature } from './base';
import { IsNotEmpty } from 'class-validator';
import { Role_Feature } from './role';

@Entity('sys_user')
@Unique(['userName'])
export class User_Feature extends Base_Feature {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  @IsNotEmpty()
  userName: string;

  @Column({ default: 0 })
  private admin: number;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column({
    default: '',
  })
  private avatar: string;

  @Column({
    default: '',
  })
  private nickName: string;

  @Column({
    type: 'int',
    comment: '0停用 1启用',
    default: 0,
  })
  private status: number;

  @Column({
    default: '',
  })
  private remark: string;

  @Column({ default: '' })
  private phonenumber: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastLoginTime: string;

  @ManyToMany(() => Role_Feature)
  @JoinTable({ name: 'sys_role_user' })
  roles: Role_Feature[];
}

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Base_Feature } from './base';
import * as dayjs from 'dayjs';
import { IsNotEmpty } from 'class-validator';

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
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  private lastLoginTime: string;
}

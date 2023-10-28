import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base_Feature } from './base';

@Entity('sys_user')
export class User_Feature extends Base_Feature {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  userName: string;

  @Column()
  private admin: boolean;

  @Column()
  password: string;

  @Column()
  private avatar: string;

  @Column()
  private nickName: string;

  @Column({
    type: 'int',
    default: 0,
  })
  private status: number;

  @Column()
  private remark: string;

  @Column()
  private phonenumber: string;
}

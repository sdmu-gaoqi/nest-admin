import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base_Feature } from './base';

@Entity('sys_role')
export class Role_Feature extends Base_Feature {
  @PrimaryGeneratedColumn()
  private roleId: number;

  @Column()
  private roleName: string;

  @Column()
  private roleKey: string;

  @Column()
  private status: number;

  @Column()
  private sort: number;

  @Column()
  private admin: boolean;
}

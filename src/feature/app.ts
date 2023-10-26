import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base_Feature } from './base';

@Entity()
export class App_Feature extends Base_Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

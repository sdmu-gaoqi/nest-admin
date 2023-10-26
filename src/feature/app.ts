import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class App_Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

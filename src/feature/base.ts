import { Column, Entity } from 'typeorm';

@Entity()
export class Base_Feature {
  @Column()
  createdAt: string;

  @Column()
  createdBy: string;

  @Column()
  updatedAt: string;

  @Column()
  updatedBy: string;
}

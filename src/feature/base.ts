import { Column, Entity } from 'typeorm';

@Entity()
export class Base_Feature {
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column()
  createdBy: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @Column()
  updatedBy: string;
}

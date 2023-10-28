import * as dayjs from 'dayjs';
import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class Base_Feature {
  @CreateDateColumn({
    type: 'datetime',
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  createdAt: string;

  @Column()
  createdBy: string;

  @CreateDateColumn({
    type: 'datetime',
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  updatedAt: string;

  @Column()
  updatedBy: string;
}

import { Column, Entity } from 'typeorm';
import * as dayjs from 'dayjs';

const transformTime = {
  to: (value) => value,
  from: (value) =>
    dayjs(value).isValid()
      ? dayjs(value).format('YYY-MM-DD HH:mm:ss')
      : dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

@Entity()
export class Base_Feature {
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: [transformTime],
  })
  createdAt: string;

  @Column({
    default: () => "''",
  })
  createdBy: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: [transformTime],
  })
  updatedAt: string;

  @Column({
    default: () => "''",
  })
  updatedBy: string;
}

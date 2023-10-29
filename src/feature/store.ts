import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('sys_store')
@Unique(['storeKey'])
export class Store_Feature extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  storeId: number;

  @Column()
  storeName: string;

  @Column()
  storeKey: string;

  @Column({ type: 'int' })
  brand: number; // 所属品牌id

  @Column({ type: 'int', default: 0 })
  status: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column()
  tel: string;

  @Column()
  phonenumber: string;

  @Column({ type: 'datetime' })
  businessHours: string;
}

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Base_Feature } from './base';

@Index('perm_pk', ['permId'], { unique: true })
@Index('perm_name', ['permName'], { unique: true })
@Index('perm', ['perm'], { unique: true })
@Entity('sys_perm')
export class Perm_Feature extends Base_Feature {
  @Index()
  @PrimaryGeneratedColumn({ comment: '权限ID' })
  permId: number;

  @Column({ type: 'varchar' })
  permName: string;

  @Column({ type: 'varchar', comment: '权限标识' })
  perm: string;

  @Column({ comment: '权限父节点' })
  parentId: number;

  @Column()
  desc: string;

  @Column({ comment: '权限点状态 0禁用 1启用', default: 1 })
  status: number;
}

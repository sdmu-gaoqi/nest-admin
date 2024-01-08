import { ApiProperty } from '@nestjs/swagger';

export class CreatePermDto {
  @ApiProperty({ description: '权限名称' })
  permName: string;

  @ApiProperty({ description: '权限标识' })
  perm: string;

  @ApiProperty({ description: '父节点' })
  parentId?: number;

  @ApiProperty({ description: '描述' })
  desc?: string;
}

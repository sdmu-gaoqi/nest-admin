import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['roleName', 'roleKey'])
export class RoleDto {
  @ApiProperty({ description: '角色名-名称唯一' })
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({ description: '角色key' })
  @IsNotEmpty()
  roleKey: string;

  @ApiProperty({ description: '备注' })
  desc: string;
}

export class UpdateRoleDto {
  @ApiProperty({ description: '角色唯一id' })
  roleId: number;

  @ApiProperty({ description: '角色状态 0禁用 1启用' })
  status?: number;

  @ApiProperty({ description: '角色名' })
  roleName?: string;

  @ApiProperty({ description: '角色描述' })
  desc?: string;
}

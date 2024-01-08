import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role_Feature } from 'src/feature/role';
import { User_Feature } from 'src/feature/user';
import { RoleDto, UpdateRoleDto } from 'src/utils/dto/role.dto';
import { Repository } from 'typeorm';
import { strict as assert } from 'node:assert';
import * as dayjs from 'dayjs';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role_Feature)
    private roleReepository: Repository<Role_Feature>,
  ) {}

  async find(id: number) {
    const role = await this.roleReepository.findOneBy({ roleId: id });
    return role;
  }

  async create(param: RoleDto, userInfo: User_Feature) {
    return await this.roleReepository.save({
      ...param,
      createdBy: userInfo.userName,
      updatedBy: userInfo.userName,
    });
  }

  async update(id: number, param: UpdateRoleDto, userInfo: User_Feature) {
    const role = await this.find(id);
    assert(role, new BadRequestException('角色不存在'));
    await this.roleReepository.update(role.roleId, {
      ...param,
      updatedBy: userInfo.userName,
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    return;
  }

  async delete(id: number) {
    assert(id !== 1, new BadRequestException('超级管理员不允许删除'));
    const role = await this.find(id);
    assert(role, new BadRequestException('角色不存在'));
    await this.roleReepository.delete(id);
    return;
  }
}

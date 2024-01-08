import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Perm_Feature } from 'src/feature/perm';
import { CreatePermDto } from 'src/utils/dto/perm.dto';
import { buildTree } from 'src/utils/tool';
import { Repository } from 'typeorm';
import { strict as assert } from 'node:assert';
import { UserService } from 'src/user/user.service';
import { User_Feature } from 'src/feature/user';

@Injectable()
export class PermService {
  constructor(
    @InjectRepository(Perm_Feature)
    private permRepository: Repository<Perm_Feature>,
    private readonly userService: UserService, // private userService: UserService,
  ) {}
  async find(id: number) {
    return await this.permRepository.findOne({ where: { permId: id } });
  }
  create(perm: CreatePermDto) {
    return this.permRepository.save(perm);
  }
  async getTree() {
    const allPerms = await this.permRepository.find();
    return buildTree(allPerms);
  }
  async delete(id: number) {
    const findPerm = await this.find(Number(id));
    assert(findPerm.status === 0, new BadRequestException('权限已被使用'));
    await this.permRepository.delete(id);
    return;
  }
  async info(userInfo: User_Feature) {
    const findUser = await this.userService.userInfo(userInfo);
    return findUser;
  }
}

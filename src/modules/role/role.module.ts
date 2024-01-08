import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role_Feature } from 'src/feature/role';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Feature } from 'src/feature/user';
import { Perm_Feature } from 'src/feature/perm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role_Feature, User_Feature, Perm_Feature]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}

import { Module } from '@nestjs/common';
import { PermService } from './perm.service';
import { PermController } from './perm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perm_Feature } from 'src/feature/perm';
import { Role_Feature } from 'src/feature/role';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Perm_Feature, Role_Feature])],
  providers: [PermService, UserService],
  controllers: [PermController],
})
export class PermModule {}

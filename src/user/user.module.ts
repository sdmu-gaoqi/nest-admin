import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Feature } from '../feature/user';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from 'src/utils/bcrypt';
import { Role_Feature } from 'src/feature/role';
import { PermModule } from 'src/modules/perm/perm.module';
import { PermService } from 'src/modules/perm/perm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User_Feature, Role_Feature]),
    PassportModule,
  ],
  providers: [UserService, BcryptService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

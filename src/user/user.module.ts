import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_Feature } from '../feature/user';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User_Feature])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

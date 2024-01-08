import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Perm_Feature } from 'src/feature/perm';
import { PermService } from './perm.service';
import { PermController } from './perm.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Perm_Feature]), UserModule],
  providers: [PermService],
  controllers: [PermController],
})
export class PermModule {}

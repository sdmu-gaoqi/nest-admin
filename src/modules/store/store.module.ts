import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store_Feature } from 'src/feature/store';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Store_Feature]), AuthModule],
  providers: [StoreService, JwtStrategy, LocalStrategy],
  controllers: [StoreController],
})
export class StoreModule {}

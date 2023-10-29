import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store_Feature } from 'src/feature/store';

@Module({
  imports: [TypeOrmModule.forFeature([Store_Feature])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}

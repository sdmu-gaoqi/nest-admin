import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import config from '../../config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App_Feature } from 'src/feature/app';

const configMap = config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => configMap],
    }),
    TypeOrmModule.forFeature([App_Feature]),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}

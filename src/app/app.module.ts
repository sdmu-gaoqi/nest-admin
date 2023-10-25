import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import config from '../../config';
import { ConfigModule } from '@nestjs/config';

const configMap = config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => configMap],
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}

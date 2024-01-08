import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './utils/interceptor/transform.interceptor';
import { UnifyExceptionFilter } from './utils/filter/unifyExceptionFilter';
import { ValidatePipe } from './utils/pipe/validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuroraMysqlConnectionOptions } from 'typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions';
import config from '../config';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CommonModule } from './common/common.module';

const configMap = config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(
      configMap.mysql as unknown as Partial<AuroraMysqlConnectionOptions>,
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [() => configMap],
    }),
    RedisModule.forRoot({
      config: configMap.redisConf,
    }),
    CommonModule,
  ],
  controllers: [],
  providers: [
    // 注册全局的异常处理
    {
      provide: APP_FILTER,
      useClass: UnifyExceptionFilter,
    },
    // 注册全局的返回格式
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidatePipe,
    },
  ],
})
export class AppModule {}

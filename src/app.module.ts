import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppModule as CodeAppModule } from './app/app.module';
import { TenantModule } from './tenant/tenant.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './utils/interceptor/transform.interceptor';
import { UnifyExceptionFilter } from './utils/filter/unifyExceptionFilter';
import { ValidatePipe } from './utils/pipe/validate';

@Module({
  imports: [UserModule, CodeAppModule, TenantModule],
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
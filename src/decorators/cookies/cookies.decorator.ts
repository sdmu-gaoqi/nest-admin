import { ExecutionContext } from '@nestjs/common';

export const Cookies = (dataKey: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return dataKey ? req.cookie?.[dataKey] : req.cookie;
};

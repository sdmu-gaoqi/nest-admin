import { createParamDecorator } from '@nestjs/common';

const UserInfo = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});

export default UserInfo;

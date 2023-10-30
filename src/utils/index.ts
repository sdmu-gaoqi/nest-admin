import { userCookie } from 'src/constants';

export * from './log4js';

export const setLoginCookie = (response, token) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  response.cookie(userCookie, token, {
    signed: true,
    expires: expirationDate,
  });
};

import { registerAs } from '@nestjs/config';

export const APP_CONFIG = registerAs('APP', () => {
  return {
    HOST: process.env['APP_HOST'],
    PORT: process.env['APP_PORT'],
  };
});

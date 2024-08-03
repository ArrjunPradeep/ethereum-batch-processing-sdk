import { registerAs } from '@nestjs/config';

// Registering application-level configuration under the 'APP' namespace
export const APP_CONFIG = registerAs('APP', () => {
  return {
    // The host on which the application will run, retrieved from environment variables
    HOST: process.env['APP_HOST'],
    
    // The port on which the application will run, retrieved from environment variables
    PORT: process.env['APP_PORT'],
    
    // The secret key for the API, likely used for authentication or encryption, retrieved from environment variables
    API_SECRET_KEY: process.env['API_SECRET_KEY']
  };
});

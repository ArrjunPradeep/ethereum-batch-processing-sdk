// Importing configuration objects from their respective files
import { APP_CONFIG } from './app.config';
import { BLOCKCHAIN_CONFIG } from './blockchain.config';
import { DATABASE_CONFIG } from './database.config';

// Exporting an array containing all configuration objects
// This array will be used to load the configurations into the application
export default [APP_CONFIG, DATABASE_CONFIG, BLOCKCHAIN_CONFIG];
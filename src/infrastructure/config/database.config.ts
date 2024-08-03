import { registerAs } from "@nestjs/config";

// Registering database-specific configuration under the 'DATABASE' namespace
export const DATABASE_CONFIG = registerAs("DATABASE", () => {
    return {
        // The type of database being used, retrieved from environment variables
        TYPE: process.env['POSTGRES_TYPE'],

        // The host address of the PostgreSQL database, retrieved from environment variables
        HOST: process.env['POSTGRES_HOST'],

        // The port on which the PostgreSQL database is running, retrieved from environment variables
        PORT: process.env['POSTGRES_PORT'],

        // The name of the PostgreSQL database, retrieved from environment variables
        NAME: process.env['POSTGRES_DB'],

        // The username for accessing the PostgreSQL database, retrieved from environment variables
        USERNAME: process.env['POSTGRES_USER'],

        // The password for accessing the PostgreSQL database, retrieved from environment variables
        PASSWORD: process.env['POSTGRES_PASSWORD'],

        // Whether to synchronize the database schema with the application models, retrieved from environment variables
        SYNCHRONIZE: process.env['POSTGRES_SYNCHRONIZE'],

        // Whether to automatically load database entities, retrieved from environment variables
        AUTO_LOAD_ENTITIES: process.env['POSTGRES_AUTO_LOAD_ENTITIES']
    }
})
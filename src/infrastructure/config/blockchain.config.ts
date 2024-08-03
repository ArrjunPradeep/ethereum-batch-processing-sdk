import { registerAs } from "@nestjs/config";

// Registering blockchain-specific configuration under the 'BLOCKCHAIN' namespace
export const BLOCKCHAIN_CONFIG = registerAs('BLOCKCHAIN', () => {
    return {
        // The URL of the blockchain node, retrieved from environment variables
        NODE_URL: process.env['NODE_URL'],

        // The private key for signing transactions, retrieved from environment variables
        PRIVATE_KEY: process.env['PRIVATE_KEY'],

        // The API key for the blockchain explorer, used for interacting with blockchain explorer services, retrieved from environment variables
        EXPLORER_API_KEY: process.env['EXPLORER_API_KEY'],

        // The address of the batch contract used in the application, retrieved from environment variables
        BACTH_CONTRACT: process.env['BATCH_CONTRACT']
    }
})
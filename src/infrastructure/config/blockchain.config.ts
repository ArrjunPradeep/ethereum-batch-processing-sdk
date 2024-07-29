import { registerAs } from "@nestjs/config";

export const BLOCKCHAIN_CONFIG = registerAs('BLOCKCHAIN', () => {
    return {
        NODE_URL: process.env['NODE_URL'],
        PRIVATE_KEY: process.env['PRIVATE_KEY'],
        EXPLORER_API_KEY: process.env['EXPLORER_API_KEY']
    }
})
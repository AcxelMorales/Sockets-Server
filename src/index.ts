import { config } from 'dotenv';

import Server from './classes/server';

async function main(): Promise<void> {
    config();

    const server = Server.instance;
    await server.listen();
}

main();
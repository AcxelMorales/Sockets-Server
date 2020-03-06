import { config } from 'dotenv';

import Server from './classes/server';

async function main(): Promise<void> {
    config();

    const server = new Server(process.env.PORT);
    await server.listen();
}

main();
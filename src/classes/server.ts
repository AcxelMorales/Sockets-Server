import http from 'http';

import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser'; 
import cors from 'cors';
import socketIO from 'socket.io';

import * as socket from '../sockets/socket';
import router from '../routes/router.routes';

export default class Server {

    private static _instance: Server;

    public app: Application;
    public io: socketIO.Server;
    private httpServer: http.Server;
    
    private constructor(private port?: number | string) {
        this.app = express();

        this.config();
        this.middlewares();
        this.routes();

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this());
    }

    private listenSockets(): void {
        console.log('.... Listen connections - sockets ....');

        this.io.on('connection', client => {
            console.log(client.id);

            socket.clientConnect(client);
            socket.user(client);
            socket.message(client, this.io);
            socket.disconnect(client);
        });
    }

    private config(): void {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares(): void {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.disable('x-powered-by');
        this.app.use(helmet());

        this.app.use(morgan('dev'));
    }

    private routes(): void {
        this.app.use(router);
    }

    public async listen(): Promise<void> {
        await this.httpServer.listen(this.app.get('port'));
        console.log(`Server on port ${this.app.get('port')}`);
    }

}

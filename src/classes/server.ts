import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser'; 
import cors from 'cors';

import router from '../routes/router.routes';

export default class Server {

    public app: Application;
    
    constructor(private port?: number | string) {
        this.app = express();

        this.config();
        this.middlewares();
        this.routes();
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
        await this.app.listen(this.app.get('port'));
        console.log(`Server on port ${this.app.get('port')}`);
    }

}

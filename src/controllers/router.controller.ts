import { Response, Request } from 'express';

import Server from '../classes/server';
import { usersOnline } from '../sockets/socket';

export function getMessages(req: Request, res: Response): Response {
    return res.status(200).json({
        ok: true,
        message: 'Nice'
    });
}

export function postMessages(req: Request, res: Response): Response {
    let body = req.body;

    const payload = {
        from: body.from,
        body: body.body
    };

    const server = Server.instance;

    server.io.emit('new-message', payload);

    return res.status(201).json({
        ok: true,
        messages: 'Message created',
        body
    });
}

export function postMessagesWithId(req: Request, res: Response): Response {
    let body = req.body;
    let id = req.params.id

    const payload = {
        from: body.from,
        body: body.body
    };

    const server = Server.instance;

    server.io.in(id).emit('private-message', payload);

    return res.status(201).json({
        ok: true,
        messages: 'Message created',
        body,
        id
    });
}

export function getIdsByUsers(req: Request, res: Response): void {
    const server = Server.instance;

    server.io.clients((err: any, clients: String[]) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            clients
        });        
    });
}

export function getUsersWithName(req: Request, res: Response) {
    return res.status(200).json({
        ok: true,
        clients: usersOnline.getAllUsers()
    });
}
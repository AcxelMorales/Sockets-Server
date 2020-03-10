import { Response, Request } from 'express';

import Server from '../classes/server';

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
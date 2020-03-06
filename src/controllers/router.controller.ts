import { Response, Request } from 'express';

export function getMessages(req: Request, res: Response): Response {
    return res.status(200).json({
        ok: true,
        message: 'Nice'
    });
}

export function postMessages(req: Request, res: Response): Response {
    let body = req.body;

    return res.status(201).json({
        ok: true,
        messages: 'Message created',
        body
    });
}

export function postMessagesWithId(req: Request, res: Response): Response {
    let body = req.body;
    let id = req.params.id

    return res.status(201).json({
        ok: true,
        messages: 'Message created',
        body,
        id
    });
}
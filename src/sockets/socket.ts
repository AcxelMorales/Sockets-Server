import { Socket } from 'socket.io';
import socketIO from 'socket.io';

import UserList from '../classes/user-list';
import User from '../classes/user';

export const usersOnline = UserList.instance;

export const clientConnect = (client: Socket) => {
    const user = new User(client.id);
    usersOnline.add(user);
};

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('.... Client disconnected ....');
        usersOnline.deleteUser(client.id);
    });
};

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: { from: string, body: string }) => {
        console.log('Message received', payload);
        io.emit('new-message', payload);
    });
};

export const user = (client: Socket) => {
    client.on('user-config', (payload: { name: string }, callback: Function) => {
    
        usersOnline.updateName(client.id, payload.name);

        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};
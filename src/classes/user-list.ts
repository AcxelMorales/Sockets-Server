import User from './user';

export default class UserList {

    private static _instance : UserList;

    private list: User[] = [];

    private constructor() { }

    public static get instance(): UserList {
        return this._instance || (this._instance = new this());
    }

    public getUser(id: string): User | undefined {
        return this.list.find(user => user.id === id);
    }

    public getAllUsers(): User[] {
        return this.list;
    }

    public getAllUsersByRoom(room: string): User[] {
        return this.list.filter(user => user.room === room);
    }

    public add(user: User): User {
        this.list.push(user);
        return user;
    }

    public updateName(id: string, name: string): void {
        for (let user of this.list) {
            if (user.id === id) {
                user.name = name;
                break;
            }
        }
    }

    public deleteUser(id: string): User | undefined {
        const tempUser = this.getUser(id);
        this.list = this.list.filter(user => user.id !== id);

        return tempUser;
    }

}
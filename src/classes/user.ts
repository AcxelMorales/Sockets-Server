export default class User {

    public id: string;
    public name: string;
    public room: string;

    constructor(id: string) {
        this.id = id;
        this.name = 'nameless';
        this.room = 'no-room'
    }

}
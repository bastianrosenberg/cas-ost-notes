export class Note {
    constructor(id = undefined, title, description){
        this._id = id;
        this.title = title;
        this.description = description;
    }
}
export default class Note {
  constructor(title, description, id = undefined) {
    this._id = id;
    this.title = title;
    this.description = description;
  }
}

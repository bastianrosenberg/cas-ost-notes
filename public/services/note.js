export default class Note {
  constructor(title, description, dueDate, importance, id = undefined) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.importance = importance;
  }
}

export default class Note {
  constructor(
    title,
    description,
    dueDate,
    importance,
    completed,
    id = undefined
  ) {
    this._id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
    this.importance = importance;
  }
}

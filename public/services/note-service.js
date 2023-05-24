import HttpHelper from "../scripts/utils/http-helper.js";
import Note from "./note.js";

export class NoteService {
  constructor() {
    this.apiBaseUrl = "/api/notes";
  }

  async getNotes(searchString, sort, showCompleted) {
    const data = await HttpHelper.ajax(
      "get",
      `${this.apiBaseUrl}?search=${searchString ?? ""}&field=${
        sort.field
      }&sort=${sort.sort}&completed=${showCompleted}`
    );
    return data.map(
      (item) =>
        new Note(
          item.title,
          item.description,
          moment(item.dueDate).format("yyyy-MM-DD"),
          item.importance,
          item.completed,
          item._id
        )
    );
  }

  async createNote(note) {
    await HttpHelper.ajax("post", this.apiBaseUrl, note);
  }

  async updateNote(note) {
    await HttpHelper.ajax("put", `${this.apiBaseUrl}/${note._id}`, note);
  }

  async getNote(id) {
    const data = await HttpHelper.ajax("get", `${this.apiBaseUrl}/${id}`);
    return new Note(
      data.title,
      data.description,
      data.dueDate,
      data.importance,
      data.completed,
      data._id
    );
  }

  async deleteNote(id) {
    await HttpHelper.ajax("delete", `${this.apiBaseUrl}/${id}`);
  }
}

export const noteService = new NoteService();

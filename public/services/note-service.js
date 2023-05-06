import { HttpHelper } from "../scripts/utils/http-helper.js";
import { Note } from "./note.js";

export class NoteService {
    constructor() {
        this.apiBaseUrl = '/api/notes';
    }

    async getNotes(searchString) {
        const data = await HttpHelper.ajax('get', `${this.apiBaseUrl}?search=${searchString ?? ''}`);
        return data.map((item) => new Note(item._id, item.title, item.description));
    }

    async createNote(note) {
        await HttpHelper.ajax('post', this.apiBaseUrl, note);
    }
}

export const noteService = new NoteService();
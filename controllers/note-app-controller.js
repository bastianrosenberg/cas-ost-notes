import path from "path";

export class NoteAppController {
  constructor() {
    const rootPath = path.resolve();
    this.noteRootPath = path.join(rootPath, "public/html/");
  }

  getIndexDocument = async (req, res) => {
    res.sendFile(`${this.noteRootPath}index.html`);
  };

  getNoteDetailDocument = (req, res) => {
    res.sendFile(`${this.noteRootPath}note.html`);
  };
}

export const noteAppController = new NoteAppController();

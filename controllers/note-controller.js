import path from 'path';

export class NoteController {
  constructor(){
    const rootPath = path.resolve();
    this.noteRootPath = path.join(rootPath, 'public/html/');   
  }

  getIndexDocument = async (req, res) => {
    res.sendFile(this.noteRootPath + 'index.html');
  }

  getCreateDocument = (req, res) => {
    res.sendFile(this.noteRootPath + 'note.html');
  }
}

export const noteController = new NoteController();
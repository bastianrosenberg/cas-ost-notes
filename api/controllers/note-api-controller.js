import moment from "moment/moment.js";
import Note from "./note.js";

class NoteApiController {
  constructor() {
    this.Note = Note;
  }

  getAllNotes = async (req, res) => {
    const searchOptions = { completed: false };
    const sortOptions = {};

    if (req.query.search !== null) {
      searchOptions.title = new RegExp(req.query.search, "i");
    }

    if (req.query.field !== null) {
      sortOptions[req.query.field] = Number(req.query.sort);
    }

    if (req.query.completed === "true") {
      delete searchOptions.completed;
    }

    res.json((await this.Note.find(searchOptions).sort(sortOptions)) || []);
  };

  createNote = async (req, res) => {
    const note = new this.Note({
      title: req.body.title,
      description: req.body.description,
      dueDate: moment(req.body.dueDate).format(),
      importance: req.body.importance,
      completed: req.body.completed,
    });

    try {
      const createdNote = await note.save();
      res.location(`/api/notes/${createdNote._id}`);
      res.status(201);
      res.json(createdNote);
    } catch {
      res.status(500).send("Could not create note.");
    }
  };

  updateNote = async (req, res) => {
    const updateNote = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      importance: req.body.importance,
      completed: req.body.completed,
    };
    await this.Note.findOneAndUpdate({ _id: req.body._id }, updateNote, {
      new: true,
    });

    res.location(`/api/notes/${updateNote._id}`);
    res.status(201);
    res.json(updateNote);
  };

  deleteNote = async (req, res) => {
    const deletedNote = await this.Note.deleteOne({ _id: req.params.id });

    if (deletedNote?.deletedCount === 1) {
      res.status(201).json({ deleted: deletedNote });
    } else {
      res.status(404).send(`Note with id ${req.params.id} not found.`);
    }
  };

  getNote = async (req, res) => {
    res.json((await this.Note.findById(req.params.id)) || new Note());
  };
}

const noteApiController = new NoteApiController();
export default noteApiController;

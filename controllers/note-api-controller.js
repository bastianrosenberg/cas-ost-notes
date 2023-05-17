import moment from "moment/moment.js";
import Note from "./note.js";

class NoteApiController {
  constructor() {
    this.Note = Note;
  }

  getAllNotes = async (req, res) => {
    const searchOptions = {};

    if (req.query.search !== null) {
      searchOptions.title = new RegExp(req.query.search, "i");
    }
    res.json((await this.Note.find(searchOptions)) || []);
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
      await note.save();
      res.redirect("notes");
    } catch {
      // TODO - show error
      // res.render("notes/new", {
      //   note: note,
      //   errorMessage: "Error creating Note",
      // });
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

    try {
      res.redirect(303, "/api/notes");
    } catch (err) {
      console.log("TODO - update err", err);
    }
  };

  // TODO - not working with then / catch
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

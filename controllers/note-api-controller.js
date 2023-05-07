import Note from "./note.js";

class NoteApiController {
  getAllNotes = async (req, res) => {
    const searchOptions = {};

    if (req.query.search !== null) {
      searchOptions.title = new RegExp(req.query.search, "i");
    }
    res.json((await Note.find(searchOptions)) || []);
  };

  createNote = async (req, res) => {
    const note = new Note({
      title: req.body.title,
    });

    try {
      const newNote = await note.save();
      //res.redirect(`notes/${newNote.id}`)
      res.redirect("notes");
    } catch {
      //TODO - show error
      // res.render("notes/new", {
      //   note: note,
      //   errorMessage: "Error creating Note",
      // });
    }
  };
}

const noteApiController = new NoteApiController();
export default noteApiController;

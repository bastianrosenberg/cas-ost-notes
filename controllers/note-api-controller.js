
import { Note } from "./note.js";

class NoteApiController {

    getAllNotes = async (req, res) => {
        let searchOptions = {};

        if(req.query.search !== null) {
            searchOptions.title = new RegExp(req.query.search, 'i');
        }
        res.json((await Note.find(searchOptions) || []));
    };

    createNote = async (req, res) => {

        const note = new Note({
            title: req.body.title
        });

        try {
            const newNote = await note.save();
            //res.redirect(`notes/${newNote.id}`)
            res.redirect('notes');  
        } catch {
            res.render('notes/new', {
                note: note,
                errorMessage: 'Error creating Note'
            });
        }      
    }
   
}

export const noteApiController = new NoteApiController();
export class MarkupGenerator {

    static generateNote(note){
        return `<div class="note" data-note-id=${note._id}
        <div class="note-title">
            <h5>${note.title}</h5>
        </div>
        </div>`
    }

    static generateNotes(notes) {
        return notes.map((note) => this.generateNote(note)).join('');
    }
}
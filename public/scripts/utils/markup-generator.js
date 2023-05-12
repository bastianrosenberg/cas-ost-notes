export default class MarkupGenerator {
  static generateNote(note) {
    return `<div class="note" data-note-id=${note._id}>
      <div class="note-title">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
        </div>
        <div class="note-buttons">
          <a href='/edit?id=${note._id}'>Edit</a>
          <button id="delete-button" data-note-id=${note._id}>Delete</button>
        </div>
        <hr>
      </div>`;
  }

  static generateNotes(notes) {
    return notes.map((note) => this.generateNote(note)).join("");
  }
}

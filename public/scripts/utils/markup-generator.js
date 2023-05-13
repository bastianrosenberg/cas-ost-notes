export default class MarkupGenerator {
  static generateNote(note) {
    return `<div class="note" data-note-id=${note._id}>
      <div class="note-title">
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <p>${note.dueDate}</p>
            <p>${note.importance}</p>
            <div id="rating" class="form-input">
            <input ${
              note.importance === 5 && "checked"
            } type="radio" id="star5" name="star" value="5"/>
            <label for="star5" title="5 stars"></label>
            <input ${
              note.importance === 4 && "checked"
            } type="radio" id="star4" name="star" value="4"/>
            <label for="star4" title="4 stars"></label>
            <input ${
              note.importance === 3 && "checked"
            }  type="radio" id="star3" name="star" value="3"/>
            <label for="star3" title="3 stars"></label>
            <input ${
              note.importance === 2 && "checked"
            }  type="radio" id="star2" name="star" value="2"/>
            <label for="star2" title="2 stars"></label>
            <input ${
              note.importance === 1 && "checked"
            }  type="radio" id="star1" name="star" value="1"/>
            <label for="star1" title="1 star"></label>
          </div>
        </div>
        <div class="note-buttons">
          <button class="btn" id="edit-button" data-note-id=${
            note._id
          }>Edit</button>
          <button class="btn" id="delete-button" data-note-id=${
            note._id
          }>Delete</button>
        </div>
        <hr>
      </div>`;
  }

  static generateNotes(notes) {
    return notes.map((note) => this.generateNote(note)).join("");
  }
}

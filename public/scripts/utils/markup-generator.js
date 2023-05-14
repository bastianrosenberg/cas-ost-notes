export default class MarkupGenerator {
  static generateNote(note) {
    return `<div class="note" data-note-id=${note._id}>
     
        <p>📅&#xFE0E; <span class="bold">${moment(note.dueDate).format(
          "DD.MM.YYYY"
        )}</span></p>

        <div>
          <div>
            <h3>${note.title}</h3>
          </div style="padding-top:10px">
        </div>


        <div class="note-buttons">
          <button class="btn" id="edit-button" data-note-id=${
            note._id
          }>Edit</button>
        </div>

        <div id="rating" class="rating compressed">
           ${this.generateImportanceMarkup(note.importance)}
        </div>

        <p>${note.description}</p>

        <div class="note-buttons">
          <button class="btn" id="delete-button" data-note-id=${
            note._id
          }>Delete</button>
        </div>

      </div>`;
  }

  static generateNotes(notes) {
    return notes.map((note) => this.generateNote(note)).join("");
  }

  static generateImportanceMarkup(importance) {
    return [1, 2, 3, 4, 5]
      .map(
        (m) =>
          `<input disabled ${
            importance === m && "checked"
          } type="radio" id="star${m}" name="star" value="${m}"/>
      <label for="star${m}" title="${m} stars"></label>`
      )
      .join("");
  }
}

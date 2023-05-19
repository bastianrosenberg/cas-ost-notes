export default class MarkupGenerator {
  static generateNote(note) {
    return `<div class="note" data-note-id=${note._id}>
     
        <p>
          <label>DueDate</label><br>
          📅&#xFE0E; <span class="bold">${moment(note.dueDate).format(
            "DD.MM.YYYY"
          )}</span></p>

          <div>
            <h3>${note.title}</h3>
          </div>

        <div class="note-buttons">
          <button class="btn" id="edit-button">Edit</button>
        </div>

        <div>
          <p>
            <label>Importance</label>
          <div id="rating" class="rating">
            ${this.generateImportanceMarkup(note)}
          </div>
          </p>
          <p>
            <label>Completed</label>
            <input type="checkbox" ${note.completed && "checked='true'"}"  />
          </p>
          </div>

        <p>${note.description}</p>

        <div class="note-buttons">
          <button class="btn" id="delete-button">Delete</button>
        </div>

      </div>`;
  }

  static generateNotes(notes) {
    return notes.length
      ? notes.map((note) => this.generateNote(note)).join("")
      : "<div>No items to display.</div>";
  }

  static generateImportanceMarkup(note) {
    return [5, 4, 3, 2, 1]
      .map(
        (m) =>
          `<input disabled ${
            note.importance === m && "checked"
          } type="radio" id="star${m}" name="importance${
            note._id
          }" value="${m}"/>
      <label for="star${m}" title="${m} star(s)"></label>`
      )
      .join("");
  }
}

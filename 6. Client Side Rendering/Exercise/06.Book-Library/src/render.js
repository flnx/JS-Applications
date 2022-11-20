import { html } from '../../../../node_modules/lit-html/lit-html.js';

export const renderBooks = (id, book) => {
  return html`
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>
        <button id="show-edit-form" data-id="${id}">Edit</button>
        <button id="onDelete" data-id="${id}">Delete</button>
      </td>
    </tr>
  `;
};

export const renderPage = (createForm) => {
  return html`
    <button id="loadBooks">LOAD ALL BOOKS</button>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <div class="formContainer">
      ${createForm ? renderEditForm() : renderCreateForm()}
    </div>
  `;
};

export const renderEditForm = () => {
  return html`
  <form id="edit-form">
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Save" id="save-edited-book" />
  </form>`;
};

export const renderCreateForm = () => {
  return html`
  <form id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" id="create-a-book"/>
  </form>`;
};
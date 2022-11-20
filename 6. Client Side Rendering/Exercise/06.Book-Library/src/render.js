import { html } from '../../../../node_modules/lit-html/lit-html.js';

export const renderPage = (ctx, isEdit, book) => {
  return html`
    <button id="loadBooks" @click=${ctx.loadBooks.bind(null, ctx)}>LOAD ALL BOOKS</button>
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
      ${isEdit ? renderEditForm(book, ctx) : renderCreateForm(ctx)}
  `;
};

export const renderBooks = (id, book, ctx) => {
  return html`
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>
        <button data-id="${id}" @click=${(e) => ctx.showEditForm(e, id, ctx, book)}>
          Edit
        </button>
        <button data-id="${id}" @click=${(e) => ctx.onDelete(e, ctx)}>Delete</button>
      </td>
    </tr>
  `;
};

export const renderEditForm = (book, ctx) => {
  return html` <form id="edit-form">
    <input type="hidden" name="id" />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title} />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author} />
    <input type="submit" value="Save" @click=${(e) => ctx.onSave(e, ctx)} />
  </form>`;
};

export const renderCreateForm = (ctx) => {
  return html` <form id="add-form" @submit=${ctx.onSubmit.bind(null, ctx)}>
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." />
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." />
    <input type="submit" value="Submit" />
  </form>`;
};
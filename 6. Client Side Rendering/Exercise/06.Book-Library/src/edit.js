import * as api from './api.js';

let bookId = null;

export function showEditForm(_, id, ctx, book) {
  bookId = id;
  ctx.renderHtmlPage(ctx, 'showEdit', book);
}

export function onSave(e, ctx) {
  e.preventDefault();

  const form = e.target.parentElement;
  const formData = new FormData(form);

  const { title, author } = Object.fromEntries(formData);

  api.put(`/${bookId}`, { title, author });

  setTimeout(() => ctx.loadBooks(), 10)
  ctx.renderHtmlPage(ctx);
}

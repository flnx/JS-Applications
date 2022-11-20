import { render } from '../../../../node_modules/lit-html/lit-html.js';
import { onSubmit } from './createABook.js';
import { onDelete } from './delete.js';
import { onSave, showEditForm } from './edit.js';
import { loadBooks } from './loadBooks.js';
import { renderBooks, renderPage } from './render.js';

const ctx = {
  renderHtmlPage,
  loadBooks,
  renderBooks,
  showEditForm,
  onDelete,
  onSave,
  onSubmit,
};

renderHtmlPage(ctx);
loadBooks(ctx)

function renderHtmlPage(ctx, formType, book) {
  render(renderPage(ctx, formType, book), document.querySelector('body'));
}
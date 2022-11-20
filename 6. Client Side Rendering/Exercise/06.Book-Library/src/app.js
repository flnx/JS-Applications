import { render } from '../../../../node_modules/lit-html/lit-html.js';
import { onSubmit } from './createABook.js';
import { onDelete } from './delete.js';
import { onSave, showEditForm } from './edit.js';
import { initialize } from './init.js';
import { loadBooks } from './loadBooks.js';
import { renderPage, renderEditForm, renderCreateForm } from './render.js';

renderHtmlPage();

const formContainer = document.querySelector('.formContainer');
const editForm = renderEditForm();
const createForm = renderCreateForm();

const ctx = {
  renderAllBooks,
  renderHtmlPage,
  loadAllBooks,
  editForm,
  createForm,
};

const buttons = {
  'show-edit-form': showEditForm,
  onDelete,
};

const forms = {
  'create-a-book': onSubmit,
  'save-edited-book': onSave,
};

formContainer.addEventListener('click', formsHandler);
document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
document.querySelector('table').addEventListener('click', buttonsHandler);

function buttonsHandler(e) {
  const target = e.target;

  if (target.tagName != 'BUTTON') {
    return;
  }

  const parent = target.closest('tr');

  const handler = buttons[e.target.id];
  handler(target, ctx, parent);
}

function formsHandler(e) {
  e.preventDefault();

  const handler = forms[e.target.id];

  if (typeof handler !== 'function') {
    return;
  }

  const form = e.target.parentElement;
  handler(form, ctx);
}

function loadAllBooks() {
  setTimeout(() => loadBooks(ctx), 50)
}

function renderAllBooks(template) {
  render(template, document.querySelector('table tbody'));
}

function renderHtmlPage(formType) {
  render(renderPage(formType), document.querySelector('body'));
}

// const router = init(links);
// router.goTo('/home');
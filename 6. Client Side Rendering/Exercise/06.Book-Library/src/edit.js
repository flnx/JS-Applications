import * as api from './api.js';

let id = null;
let title = null;
let author = null;
let form = null;

export function showEditForm(target, context, parent) {
  id = target.dataset.id;

  title = parent.children[0].textContent;
  author = parent.children[1].textContent;

  context.renderHtmlPage('show edit form');

  form = document.getElementById('edit-form');

  form.querySelector('input[name=author]').value = author;
  form.querySelector('input[name=title]').value = title;
}

export function onSave(_, context) {
  const formData = new FormData(form);

  const title = formData.get('title');
  const author = formData.get('author');

  const body = {
    title,
    author,
  };

  api.put(`/${id}`, body);

  context.loadAllBooks();
  setTimeout(() => context.renderHtmlPage(), 10);
}

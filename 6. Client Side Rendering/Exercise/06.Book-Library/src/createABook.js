import * as api from './api.js';

export async function onSubmit(form, context) {
  const formData = new FormData(form);

  const title = formData.get('title');
  const author = formData.get('author');

  if (title == '' || author == '') {
    return alert('All fields are required');
  }

  const body = {
    title,
    author,
  };

  api.post('/', body);

  context.loadAllBooks();
  form.reset();
}

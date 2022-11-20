import * as api from './api.js';

export async function onSubmit(ctx, e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const { title, author } = Object.fromEntries(formData);

  if (title == '' || author == '') {
    return 'All fields are required';
  }
  
  api.post('/', { title, author });

  ctx.loadBooks(ctx);
  form.reset();
}

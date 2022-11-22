import { createIdea } from '../api/cardData.js';

const section = document.getElementById('createView');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export async function showCreate(ctx) {
  context = ctx;
  ctx.render(section);
}

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const { title, description, imageURL } = Object.fromEntries(formData);

  if (title.length < 6) {
    return alert('The title should be at least 6 characters long!');
  }

  if (description.length < 10) {
    return alert('Description should be at least 10 characters long!');
  }

  if (imageURL.length < 5) {
    return alert('The Image URL must be at least 5 characters long!');
  }

  await createIdea({ title, description, img: imageURL });

  form.reset();
  context.page.redirect('/dashboard');
}

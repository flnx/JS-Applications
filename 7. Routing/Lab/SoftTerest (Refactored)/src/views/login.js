import { login } from '../api/user.js';

const section = document.getElementById('loginView');
const form = section.querySelector('form');

form.addEventListener('submit', onSubmit);

let context = null;

export async function showLogin(ctx) {
  context = ctx;
  ctx.render(section);
}

async function onSubmit(e) {
  e.preventDefault();


  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);

  if (email == '' || password == '') {
    return alert("Fields can't be empty!");
  }

  await login({ email, password });
  form.reset();
  context.page.redirect('/home');
}

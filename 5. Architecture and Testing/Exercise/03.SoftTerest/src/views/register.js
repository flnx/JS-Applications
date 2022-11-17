import { register } from '../api/user.js';

const section = document.getElementById('registerView');
const form = section.querySelector('form');

let ctx = null;

export async function showRegister(context) {
  ctx = context
  ctx.showSection(section);
}

form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { email, password, repeatPassword } = Object.fromEntries(formData);

  if (email.length < 3) {
    return alert('Email must be at least 3 characters long');
  }

  if (password.length < 3) {
    return alert('Password must be at least 3 characters long');
  }

  if (password !== repeatPassword) {
    return alert("Passwords don't match!");
  }

  await register({ email, password });
  form.reset();
  ctx.goTo('/home')
}

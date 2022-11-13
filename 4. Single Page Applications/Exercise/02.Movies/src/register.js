import { refreshPage } from './refreshPage.js';
import { homePage } from './home.js';
import { loginOrRegisterReq } from './requests.js';

const section = document.getElementById('form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);

export function registerPage(_, container, footer) {
  refreshPage();
  container.insertBefore(section, footer);
}

export async function onRegister() {
  const formData = new FormData(form);

  const { email, password, repeatPassword } = Object.fromEntries(formData);
  if (email == '' || password == '' || repeatPassword == '') {
    return alert('All fields are required!');
  }

  if (password.length < 6) {
    return alert('Password must be at least 6 characters long!');
  }

  if (password !== repeatPassword) {
    return alert("Passwords don't match!");
  }

  const userData = await loginOrRegisterReq('users/register', { email, password });

  if (!userData) {
    return;
  }

  sessionStorage.setItem('userData', JSON.stringify(userData));

  form.reset();
  homePage();
}
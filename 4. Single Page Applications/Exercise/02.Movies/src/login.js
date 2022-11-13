import { homePage } from './home.js';
import { refreshPage } from './refreshPage.js';
import { loginOrRegisterReq } from './requests.js';

const section = document.getElementById('form-login');
const form = section.querySelector('form');

export function loginPage(_, container, footer) {
  refreshPage();
  container.insertBefore(section, footer);
}

export async function onLogin() {
  const formData = new FormData(form);
  const { email, password } = Object.fromEntries(formData);

  if (email == '' || password == '') {
    return alert('All fields are required!');
  }

  if (password.length < 6) {
    return alert("Password can't be less than 6 characters!");
  }

  const userData = await loginOrRegisterReq('users/login', { email, password });

  if (!userData) {
    return;
  }

  sessionStorage.setItem('userData', JSON.stringify(userData));

  form.reset();
  homePage();
}


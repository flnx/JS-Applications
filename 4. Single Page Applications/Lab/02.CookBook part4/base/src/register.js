import { setupCatalog } from './catalog.js';
import { checkUserPermissions } from './auth.js';

let main;
let registerSection;

export function registerPage(mainSec, regSec) {
  main = mainSec;
  registerSection = regSec;
  const form = regSec.querySelector('form');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit(
      [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {})
    );
  });

  async function onSubmit(data) {
    if (data.password != data.rePass) {
      return console.error("Passwords don't match");
    }

    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    try {
      const response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();
      if (response.status == 200) {
        sessionStorage.setItem('authToken', data.accessToken);
        checkUserPermissions();
        setupCatalog();
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}

export function onRegister(e) {
  main.replaceChildren();
  main.appendChild(registerSection);
}

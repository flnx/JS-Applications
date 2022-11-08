import { setupCatalog } from './catalog.js';
import { checkUserPermissions } from './auth.js';

let main;
let section;

export function loginPage(targetMain, targetSection) {
  main = targetMain;
  section = targetSection;
  const form = targetSection.querySelector('form');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit(
      [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {})
    );
  });

  async function onSubmit(data) {
    const body = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    try {
      const response = await fetch('http://localhost:3030/users/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await response.json();
      if (response.status == 200) {
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);

        checkUserPermissions();
        setupCatalog();
      } else {
        alert(data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
export function onLogin() {
  main.replaceChildren();
  main.appendChild(section);
}

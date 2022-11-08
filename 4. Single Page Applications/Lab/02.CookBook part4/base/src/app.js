import { checkUserPermissions } from './auth.js';
import { catalogInfo, setupCatalog } from './catalog.js';
import { loginPage, onLogin } from './login.js';
import { logout } from './logout.js';
import { registerPage, onRegister } from './register.js';
import { setupRecipe, onCreateRecipe } from './create.js';
import { setupDetails } from './details.js';
import { setupEdit } from './edit.js';

window.addEventListener('load', async () => {
  checkUserPermissions();
  const main = document.querySelector('main');

  document.querySelector('nav').addEventListener('click', setupNavigation);

  catalogInfo(main, document.getElementById('catalog'));
  loginPage(main, document.getElementById('login'));
  registerPage(main, document.getElementById('register'));
  setupRecipe(main, document.getElementById('create'));
  setupDetails(main, document.getElementById('details'));
  setupEdit(main, document.getElementById('edit'));

  document.getElementById('views').remove();

  function setupNavigation(e) {
    e.preventDefault();
    const target = e.target.innerText;

    if (e.target.tagName !== 'A') {
      return;
    }

    if (target == 'Catalog') {
      setupCatalog();
    } else if (target == 'Login') {
      onLogin();
    } else if (target == 'Register') {
      onRegister();
    } else if (target == 'Create Recipe') {
      onCreateRecipe();
    } else if (target == 'Logout') {
      logout();
    }
  }
  setupCatalog();
});

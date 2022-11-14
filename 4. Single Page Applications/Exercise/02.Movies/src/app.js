import { homePage } from './home.js';
import { loginPage, onLogin } from './login.js';
import { registerPage, onRegister } from './register.js';
import { onDetails } from './details.js';
import { onLogout } from './logout.js';
import { onEdit, editPage } from './edit.js';
import { onDelete } from './delete.js';
import { onLike } from './like.js';
import { addMoviePage, onAdd } from './addMovie.js';

const container = document.getElementById('container');
const footer = document.querySelector('.page-footer');

container.addEventListener('click', handler);

homePage();

const navigation = {
  logo: homePage,
  login: loginPage,
  register: registerPage,
  onLogin,
  onRegister,
  onLogout,
  onDetails,
  onDelete,
  onLike,
  onEdit,
  editPage,
  addMoviePage,
  onAdd
};

function handler(e) {
  e.preventDefault();
  const target = e.target.tagName;

  if ((target != 'BUTTON' && target != 'A') || e.target.id == 'welcome-msg') {
    return;
  }

  const att = e.target.getAttribute('data-btn-type');
  const view = navigation[att];
  view(e, container, footer);
}
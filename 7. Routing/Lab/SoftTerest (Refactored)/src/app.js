import { html, render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { showHome } from './views/home.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { onLogout } from './views/logout.js';
import { userAuth } from './auth.js';

const main = document.getElementById('main');

function viewController(ctx, next) {
  ctx.render = (section) => render(section, main);
  ctx.render2 = (section, parent) => render(section, parent)
  ctx.html = html;
  userAuth();
  next();
}

page(viewController);
page('/', showHome);
page('/home', showHome);
page('/register', showRegister);
page('/login', showLogin);
page('/create', showCreate);
page('/logout', onLogout);
page('/dashboard', showDashboard);
page('/dashboard/:_id', showDetails);
page('*', notFound);
page.start();

function notFound() {
  const template = () => html`<h1>404 Not Found</h1>`;
  render(template(), main);
}



import page from '../node_modules/page/page.mjs';
import { render, html } from '../node_modules/lit-html/lit-html.js';
import { checkUserAuth } from './auth.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { furniturePage } from './views/furniture.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { onLogout } from './views/logout.js';
import { showDetails } from './views/details.js';
import { editPage } from './views/edit.js';

const main = document.getElementById('main');

checkUserAuth();

page(contextDecorator)

page('/index.html', '/catalog');
page('/', catalogPage);
page('/catalog', catalogPage);

page('/details/:id', showDetails);

page('/create', createPage);
page('/edit/:id', editPage);
page('/my-furniture', furniturePage);

page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page.start();

function contextDecorator(context, next) {
  context.render = (section) => render(section, main);
  context.render2 = (section) => render(section, parent);
  context.html = html;
  checkUserAuth();
  next()
}
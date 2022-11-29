import { page } from './lib.js';

import { ctxDecorator } from './layout.js';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { onLogout } from './views/logout.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { searchPage, showResult } from './views/search.js';
import { detailsPage } from './views/details.js';
import { dashboardPage } from './views/dashboard.js';

page(ctxDecorator);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/add', createPage);
page('/edit', editPage);
page('/edit/:id', editPage);
page('/details', detailsPage);
page('/details/:id', detailsPage);
page('/dashboard', dashboardPage);
page('/search', searchPage);
page('/search/result', showResult);
page.start();
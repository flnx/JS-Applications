import page from '../node_modules/page/page.mjs'
import { ctxDecorator } from './layout.js';
import { browsePage } from './views/browse.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { onLogout } from './views/logout.js';
import { myTeamsPage } from './views/myTeams.js';
import { registerPage } from './views/register.js';

page(ctxDecorator);
page('/index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/browse', browsePage);
page('/myteams', myTeamsPage);
page('/logout', onLogout);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page.start();



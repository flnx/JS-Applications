import { page } from './lib.js';
import { ctxDecorator } from './layout.js';

import { welcomePage } from './views/welcome.js';
import { searchPage } from './views/search.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { onLogout } from './views/logout.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { catalogPage } from './views/catalog.js';

page(ctxDecorator);
page('/', welcomePage);
page('/catalog', catalogPage);
page('/search', searchPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage);
page('/edit', editPage);
page('/edit/:id', editPage);
page('/details', detailsPage);
page('/details/:id', detailsPage);
page('/search', searchPage);

page.start();

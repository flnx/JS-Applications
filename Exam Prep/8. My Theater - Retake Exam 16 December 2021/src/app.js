import { page }  from './lib.js';
import { ctxDecorator } from './layout.js';

import { myProfilePage } from './views/myProfile.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { onLogout } from './views/logout.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { welcomePage } from './views/welcome.js';


page(ctxDecorator);
page('/', welcomePage);
page('/profile', myProfilePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage);
page('/edit', editPage);
page('/edit/:id', editPage);
page('/details', detailsPage);
page('/details/:id', detailsPage);
page.start();
import { page }  from './lib.js';
import { ctxDecorator } from './layout.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { onLogout } from './views/logout.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { dashboardPage } from './views/dashboard.js';
import { myBooksPage } from './views/mybooks.js';


page(ctxDecorator);
page('/', '/dashboard');
page('/dashboard', dashboardPage);
page('/my-books', myBooksPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/create', createPage);
page('/edit', editPage);
page('/edit/:id', editPage);
page('/details', detailsPage);
page('/details/:id', detailsPage);
page.start();
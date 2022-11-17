import { showHome } from './views/home.js';
import { showRegister } from './views/register.js';
import { showLogin } from './views/login.js';
import { showDashboard } from './views/dashboard.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { onLogout } from './views/logout.js';
import { init } from './router.js';

// document.getElementById('hiddenSections').remove();

const links = {
  '/home': showHome,
  '/register': showRegister,
  '/login': showLogin,
  '/dashboard': showDashboard,
  '/create': showCreate,
  '/logout': onLogout,
  '/details': showDetails,
};

const router = init(links);
router.goTo('/home');
import * as api from '../api/user.js';

export const onLogout = async (ctx) => {
  api.logout();
  ctx.page.redirect('/');
};

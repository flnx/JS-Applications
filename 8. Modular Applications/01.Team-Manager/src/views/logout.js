import * as api from '../api.js/user.js';

export const onLogout = async (ctx) => {
  await api.logout();

  ctx.page.redirect('/');
};

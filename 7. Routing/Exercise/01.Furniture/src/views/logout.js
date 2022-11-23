import * as user from "../api/user.js";

export async function onLogout(ctx) {
  await user.logout();
  ctx.page.redirect('/');
}
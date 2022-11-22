import { logout } from "../api/user.js";

export const onLogout = async (ctx) => {  
  await logout();
  ctx.page.redirect('/home')
};
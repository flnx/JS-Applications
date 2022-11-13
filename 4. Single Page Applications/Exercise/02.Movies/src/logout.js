import { getUserData } from './auth.js';
import { homePage } from './home.js';
import { logoutRequest } from './requests.js';

export async function onLogout() {
  const token = getUserData().accessToken;
  logoutRequest(token);
  homePage();
  sessionStorage.clear();
}
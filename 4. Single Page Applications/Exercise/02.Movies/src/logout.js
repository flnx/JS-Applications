import { getUserData } from './auth.js';
import { homePage } from './home.js';

export async function onLogout() {
  logoutRequest('users/logout');
  homePage();
  sessionStorage.clear();
}

export async function logoutRequest(path) {
  const token = getUserData().accessToken;

  await fetch('http://localhost:3030/users/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  });
}

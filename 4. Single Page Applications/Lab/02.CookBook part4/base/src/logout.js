import { checkUserPermissions } from './auth.js';
import { setupCatalog } from './catalog.js';

export async function logout() {
  const token = sessionStorage.getItem('authToken');

  const response = await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {
      'X-Authorization': token,
    },
  });

  if (response.ok) {
    sessionStorage.clear();
    checkUserPermissions();
    setupCatalog();
  } else {
    console.error(await response.json());
  }
}
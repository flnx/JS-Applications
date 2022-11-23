import * as api from './api.js';

const endpoints = {
  login: 'users/login',
  logout: 'users/logout',
  register: 'users/register',
};

export async function login({ email, password }) {
  const user = await api.post(endpoints.login, { email, password });
  sessionStorage.setItem('userData', JSON.stringify(user));
}

export async function register({ email, password }) {
  const user = await api.post(endpoints.register, { email, password });
  sessionStorage.setItem('userData', JSON.stringify(user));
}

export async function logout() {
  api.get(endpoints.logout);
  sessionStorage.removeItem('userData');
}

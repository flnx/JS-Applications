import * as api from './api.js';
import { setUser, clearUser } from './session.js'

const endpoints = {
  login: 'users/login',
  logout: 'users/logout',
  register: 'users/register',
};

export async function login({ username, password }) {
  const user = await api.post(endpoints.login, { username, password });
  setUser(user);
}

export async function register({ username, password }) {
  const user = await api.post(endpoints.register, { username, password });
  setUser(user)
}

export async function logout() {
  api.get(endpoints.logout);
  clearUser();
}
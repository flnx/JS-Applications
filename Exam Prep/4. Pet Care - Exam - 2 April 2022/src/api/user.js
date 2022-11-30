import * as api from './api.js';
import { setUser, clearUser } from './session.js'

const endpoints = {
  login: 'users/login',
  logout: 'users/logout',
  register: 'users/register',
};

export async function login({ email, password }) {
  const user = await api.post(endpoints.login, { email, password });
  setUser(user);
}

export async function register({ email, password }) {
  const user = await api.post(endpoints.register, { email, password });
  setUser(user)
}

export async function logout() {
  api.get(endpoints.logout);
  clearUser();
}
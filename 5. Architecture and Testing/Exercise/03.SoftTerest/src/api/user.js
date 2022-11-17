import * as api from './api.js';

const endpoints = {
  login: 'users/login',
  logout: 'users/logout',
  register: 'users/register',
  getIdea: 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
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


export async function getIdeaById() {
  const idea = await api.get(endpoints.getIdeaById);
  return idea.json();
}
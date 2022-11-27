import * as api from './api.js';

const endpoints = {
  login: 'users/login',
  register: 'users/register',
  logout: 'users/logout',
  create: 'data/teams',
  join: 'data/members',
  approve: (id) => `data/members/${id}`,
  delete: (id) => `data/members/${id}`,
};

export const memberRequest = async (data) => {
  const response = await api.post(endpoints.join, { teamId: data._id });

  if (typeof response == 'object') {
    return response;
  }

  return false;
}

export const approveRequest = async (data) => {
  const response = await api.put(endpoints.approve(data._id), data);

  if (typeof response == 'object') {
    return response;
  }

  throw response;
}

export const cancelRequest = async (id, teamId) => {
  const response = await api.delete(endpoints.delete(id, teamId));

  if (typeof response == 'object') {
    return response;
  }

  throw response;
}

export const createTeam = async (data) => {
  const response = await api.post(endpoints.create, data);

  if (typeof response == 'object') {
    return response;
  }

  return false;
};

export const login = async (data) => {
  const response = await api.post(endpoints.login, data);

  if (typeof response == 'object') {
    sessionStorage.setItem('userData', JSON.stringify(response));
    return true;
  }

  return response;
};

export const register = async (data) => {
  const response = await api.post(endpoints.register, data);

  if (typeof response == 'object') {
    sessionStorage.setItem('userData', JSON.stringify(response));
    return true;
  }

  return response;
};

export const logout = async () => {
  await api.get(endpoints.logout)
  sessionStorage.removeItem('userData');
};
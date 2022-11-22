import * as api from './api.js';

const endpoints = {
  getIdeas: 'data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
  getDetails: 'data/ideas/',
};

export async function getIdeas() {
  return await api.get(endpoints.getIdeas);
}

export async function getDetailsById(id) {
  return await api.get(endpoints.getDetails + id);
}

export async function deleteCard(id) {
  return await api.delete(endpoints.getDetails + id);
}

export async function createIdea(userData) {
  return await api.post(endpoints.getDetails, userData);
}

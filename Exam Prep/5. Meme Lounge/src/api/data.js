import * as api from './api.js';

const endpoints = {
  getItems: 'data/memes?sortBy=_createdOn%20desc',
  post: 'data/memes', 
  edit: (id) => `data/memes/${id}`,
  delete: (id) => `data/memes/${id}`,
  itemDetails: (id) => `data/memes/${id}`,
  profile: (userId) => `data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};

export async function getItems() {
  return await api.get(endpoints.getItems);
}

export async function getItemDetails(id) {
  return await api.get(endpoints.itemDetails(id));
}

export async function createItem(data) {
  return await api.post(endpoints.post, data);
}

export async function deleteItem(id) {
  return await api.delete(endpoints.delete(id));
}

export async function editItem(id, data) {
  return await api.put(endpoints.edit(id), data);
}

export async function userProfile(userId) {
  return await api.get(endpoints.profile(userId));
}
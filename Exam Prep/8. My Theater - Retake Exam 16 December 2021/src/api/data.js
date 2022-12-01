import * as api from './api.js';

const endpoints = {
  getItems: 'data/theaters?sortBy=_createdOn%20desc&distinct=title',
  profile: (userId) => `data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  post: 'data/theaters', 
  edit: (id) => `data/theaters/${id}`,
  delete: (id) => `data/theaters/${id}`,
  itemDetails: (id) => `data/theaters/${id}`,
  getLikes: (theaterId) => `data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
  like:  `data/likes`,
  userLike: (theaterId, userId) => `data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getItems() {
  return await api.get(endpoints.getItems);
}

export async function getMyInfo(id) {
  return await api.get(endpoints.profile(id));
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

export async function getLikes(id) {
  return await api.get(endpoints.getLikes(id));
}

export async function like(data) {
  return await api.post(endpoints.like, data);
}

export async function getUserLike(id, userId) {
  return await api.get(endpoints.userLike(id, userId));
}
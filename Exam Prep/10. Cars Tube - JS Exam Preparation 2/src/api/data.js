import * as api from './api.js';

const endpoints = {
  getItems: 'data/cars?sortBy=_createdOn%20desc',
  post: 'data/cars', 
  edit: (id) => `data/cars/${id}`,
  delete: (id) => `data/cars/${id}`,
  itemDetails: (id) => `data/cars/${id}`,
  search: (query) => `data/cars?where=year%3D${query}`,
  myListings: (userId) => `data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
};

export async function getItems() {
  return await api.get(endpoints.getItems);
}

export async function getMyListings(userId) {
  return await api.get(endpoints.myListings(userId));
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

export async function search(query) {
  return await api.get(endpoints.search(query));
}
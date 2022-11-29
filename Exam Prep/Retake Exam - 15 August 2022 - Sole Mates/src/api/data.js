import * as api from './api.js';
import { setUser, clearUser } from './session.js'

const endpoints = {
  getItem: 'data/shoes?sortBy=_createdOn%20desc',
  itemDetails: (id) => `data/shoes/${id}`,
  delete: (id) => `data/shoes/${id}`,
  edit: (id) => `data/shoes/${id}`,
  post: 'data/shoes',
  search: (query) => `data/shoes?where=brand%20LIKE%20%22${query}%22`
};

export async function getItems() {
  return await api.get(endpoints.getItem);
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

export async function searchItem(query) {
  return await api.get(endpoints.search(query));
}






import * as api from './api.js';

const endpoints = {
  getItems: 'data/albums?sortBy=_createdOn%20desc&distinct=name',
  post: 'data/albums', 
  edit: (id) => `data/albums/${id}`,
  delete: (id) => `data/albums/${id}`,
  itemDetails: (id) => `data/albums/${id}`,
  search: (query) => `data/albums?where=name%20LIKE%20%22${query}%22`,
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

export async function search(query) {
  return await api.get(endpoints.search(query));
}
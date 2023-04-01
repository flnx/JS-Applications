import * as api from './api.js';

const endpoints = {
  getItems: 'data/fruits?sortBy=_createdOn%20desc',
  post: 'data/fruits', 
  edit: (id) => `data/fruits/${id}`,
  delete: (id) => `data/fruits/${id}`,
  itemDetails: (id) => `data/fruits/${id}`,
  search: (query) => `data/fruits?where=name%20LIKE%20%22${query}%22`,
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

export async function getSearchResult(query) {
  return await api.get(endpoints.search(query));
}
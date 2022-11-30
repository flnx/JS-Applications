import * as api from './api.js';
import { setUser, clearUser } from './session.js'

const endpoints = {
  getItem: 'data/offers?sortBy=_createdOn%20desc',
  itemDetails: (id) => `data/offers/${id}`,
  delete: (id) => `data/offers/${id}`,
  edit: (id) => `data/offers/${id}`,
  post: 'data/offers',
  apply: `data/applications`,
  totalCounts: (id) => `data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`,
  applyCount: (offer, user) => `data/applications?where=offerId%3D%22${offer}%22%20and%20_ownerId%3D%22${user}%22&count`
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

export async function apply(data) {
  return await api.post(endpoints.apply, data);
}

export async function applyCount(offerId, userId) {
  return await api.get(endpoints.applyCount(offerId, userId));
}

export async function getTotalApplications(offerId) {
  return await api.get(endpoints.totalCounts(offerId));
}







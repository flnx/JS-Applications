import * as api from './api.js';

const endpoints = {
  getItem: 'data/posts?sortBy=_createdOn%20desc',
  getUserPosts: (userId) => `data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  itemDetails: (id) => `data/posts/${id}`,
  delete: (id) => `data/posts/${id}`,
  edit: (id) => `data/posts/${id}`,
  post: 'data/posts',
  donate: `data/donations`,                    
  allDonations: (id) => `data/donations?where=postId%3D%22${id}%22&distinct=_ownerId&count`,
  specificDonation: (postId, userId) => `data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

export async function donate(data) {
  return await api.post(endpoints.donate, data);
}

export async function specificDonation(postId, userId) {
  return await api.get(endpoints.specificDonation(postId, userId));
}

export async function allDonations(id) {
  return await api.get(endpoints.allDonations(id));
}

export async function getUserPosts(id) {
  return await api.get(endpoints.getUserPosts(id));
}


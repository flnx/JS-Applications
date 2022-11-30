import * as api from './api.js';

const endpoints = {
  getItem: 'data/pets?sortBy=_createdOn%20desc&distinct=name',
  // getUserPosts: (userId) => `data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  itemDetails: (id) => `data/pets/${id}`,
  delete: (id) => `data/pets/${id}`,
  edit: (id) => `data/pets/${id}`,
  post: 'data/pets',
  donate: `data/donation`,                    
  allDonations: (petId) => `data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  specificDonation: (petId, userId) => `data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
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

// export async function getUserPosts(id) {
//   return await api.get(endpoints.getUserPosts(id));
// }


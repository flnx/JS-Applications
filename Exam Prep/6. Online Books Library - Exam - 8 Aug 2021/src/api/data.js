import * as api from './api.js';

const endpoints = {
  getItems: 'data/books?sortBy=_createdOn%20desc',
  myBooks: (userId) => `data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
  post: 'data/books', 
  edit: (id) => `data/books/${id}`,
  delete: (id) => `data/books/${id}`,
  itemDetails: (id) => `data/books/${id}`,
  getLikes: (bookId) => `data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
  like:  `data/likes`,
  userLike: (bookId, userId) => `data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function getItems() {
  return await api.get(endpoints.getItems);
}

export async function getMyBooks(id) {
  return await api.get(endpoints.myBooks(id));
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

export async function getUserLike(bookId, userId) {
  return await api.get(endpoints.userLike(bookId, userId));
}


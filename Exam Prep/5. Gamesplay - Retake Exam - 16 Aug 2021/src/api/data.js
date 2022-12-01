import * as api from './api.js';

const endpoints = {
  getItems: 'data/games?sortBy=_createdOn%20desc',
  latest: 'data/games?sortBy=_createdOn%20desc&distinct=category',
  post: 'data/games', 
  edit: (id) => `data/games/${id}`,
  delete: (id) => `data/games/${id}`,
  itemDetails: (id) => `data/games/${id}`,
  comments: (gameId) => `data/comments?where=gameId%3D%22${gameId}%22`,
  postAComment: `data/comments`
};

export async function getItems() {
  return await api.get(endpoints.getItems);
}

export async function getLatestGames() {
  return await api.get(endpoints.latest);
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

export async function getComments(gameId) {
  return await api.get(endpoints.comments(gameId));
}

export async function postAComment(data) {
  return await api.post(endpoints.postAComment, data);
}


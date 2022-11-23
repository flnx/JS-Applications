import * as api from './api.js';

const endpoints = {
  allFurniture: 'data/catalog',
  myFurniture: 'data/catalog/?where=_ownerId%3D%22',
  create: 'data/catalog',
  details: 'data/catalog/',
  update: 'data/catalog/',
  delete: 'data/catalog/',
};

export async function getAllFurniture() {
  return await api.get(endpoints.allFurniture);
}

export async function getItemDetails(id) {
  return await api.get(endpoints.details + id);
}

export async function updateItem(id, data) {
  return await api.put(endpoints.update + id, data);
}

export async function deleteItem(id) {
  return await api.delete(endpoints.delete + id);
}

export async function createItem(data) {
  return await api.post(endpoints.create, data);
}

export async function getUserItems(id) {
  const path = endpoints.myFurniture + id + '%22';
  return await api.get(path)
}
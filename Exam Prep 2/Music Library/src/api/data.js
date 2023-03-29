import * as api from './api.js';

const endpoints = {
    getItems: 'data/albums?sortBy=_createdOn%20desc',
    latest: 'data/games?sortBy=_createdOn%20desc&distinct=category',
    post: 'data/albums',
    edit: (id) => `data/albums/${id}`,
    delete: (id) => `data/albums/${id}`,
    itemDetails: (id) => `data/albums/${id}`,
    userLikes: (albumId, userId) =>
        `data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    albumLikes: (albumId) => `data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    sendLike: `data/likes`,
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

export async function getAlbumLikes(albumId) {
    return await api.get(endpoints.albumLikes(albumId));
}

export async function getUserLikes(albumId, userId) {
    return await api.get(endpoints.userLikes(albumId, userId));
}

export async function sendLike(albumId) {
    return await api.post(endpoints.sendLike, albumId);
}

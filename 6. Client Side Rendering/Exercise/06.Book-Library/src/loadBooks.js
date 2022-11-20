import { renderBooks } from './render.js';
import * as api from './api.js';

export async function loadBooks(context) {
  const data = await api.get('/');
  
  const keys = Object.keys(data);
  const template = keys.map((key) => renderBooks(key, data[key]));

  context.renderAllBooks(template);
}

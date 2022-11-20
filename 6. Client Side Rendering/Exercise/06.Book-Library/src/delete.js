import * as api from './api.js';

export function onDelete(e, ctx) {
  const id = e.target.dataset.id;

  api.delete(`/${id}`);
  setTimeout(() => ctx.loadBooks(), 10)
}

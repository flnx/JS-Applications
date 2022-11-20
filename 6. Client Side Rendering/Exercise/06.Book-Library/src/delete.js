import * as api from './api.js';

export function onDelete(target, context) {
  const id = target.dataset.id;

  api.delete(`/${id}`);
  context.loadAllBooks();
}

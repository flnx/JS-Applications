import { render } from '../../../../node_modules/lit-html/lit-html.js';
import * as api from './api.js';

let ctx = null;

export async function loadBooks(context) {
  ctx = context ? context : ctx;

  const data = await api.get('/');

  const keys = Object.keys(data);
  const template = keys.map((id) => ctx.renderBooks(id, data[id], ctx));

  render(template, document.querySelector('table tbody'));
}
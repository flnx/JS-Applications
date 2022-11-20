import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import * as api from './api.js';

document.querySelector('form').addEventListener('submit', addItem);
const input = document.getElementById('itemText');

const loadTowns = async () => {
  const data = await api.get();

  const options = Object.values(data).map(createOptions);
  render(options, document.getElementById('menu'));
};

async function addItem(e) {
  e.preventDefault();
  api.post(input.value);

  input.value = '';
  loadTowns();
}

const createOptions = (option) => {
  return html` <option value=${option._id}>${option.text}</option> `;
};

loadTowns();
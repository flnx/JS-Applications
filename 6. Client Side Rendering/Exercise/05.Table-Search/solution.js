import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import * as api from './api.js';

const input = document.querySelector('#searchField');
const trs = document.getElementsByTagName('tr');

document.querySelector('#searchBtn').addEventListener('click', onClick);

const loadData = async () => {
  const data = await api.getData();

  const template = Object.values(data).map(renderProfile);
  render(template, document.querySelector('.container tbody'));
};

const renderProfile = (profile) => {
  return html`
    <tr>
      <td>${profile.firstName} ${profile.lastName}</td>
      <td>${profile.email}</td>
      <td>${profile.course}</td>
    </tr>
  `;
};

function onClick() {
  const searchText = input.value.toLowerCase();

  if (searchText == '') {
    return;
  }

  Array.from(trs).forEach((tr) => {
    const rowContent = tr.textContent.toLowerCase();

    if (rowContent.includes(searchText)) {
      tr.className = 'select';
    } else {
      tr.className = '';
    }
  });

  input.value = '';
}

loadData();

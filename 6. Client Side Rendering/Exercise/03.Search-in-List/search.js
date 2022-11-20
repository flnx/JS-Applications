import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const input = document.querySelector('#searchText');
document.querySelector('button').addEventListener('click', search);

const renderTowns = () => {
  return html`
    <ul>
      ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>`;
};

render(renderTowns(), document.getElementById('towns'));

function search() {
  const userSearch = input.value;
  let matches = 0;

  if (userSearch == '') {
    return;
  }

  document.querySelectorAll('ul li').forEach((li) => {
    const town = li.textContent;

    if (town.includes(userSearch)) {
      li.className = 'active';
      matches++;
    } else {
      li.className = '';
    }
  });

  document.getElementById('result').textContent = `${matches} matches found`;
  input.value = '';
}
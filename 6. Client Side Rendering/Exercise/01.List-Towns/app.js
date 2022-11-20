import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const form = document.getElementById('towns');

document.getElementById('btnLoadTowns').addEventListener('click', onLoad);

function onLoad(e) {
  e.preventDefault();

  const towns = form.value.split(', ');
  update(renderTowns(towns));
}

const renderTowns = (towns) =>
  html` <ul>
    ${towns.map(townsTemplate)}
  </ul>`;

const townsTemplate = (town) => html`<li>${town}</li>`;

function update(towns) {
  render(towns, document.getElementById('root'));
}

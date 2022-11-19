import { html, render } from '../../../node_modules/lit-html/lit-html.js';

const rootDiv = document.getElementById('root');
const form = document.getElementById('towns');
const loadBtn = document.getElementById('btnLoadTowns');

const towns = [];

loadBtn.addEventListener('click', onLoad);

const townsTemplate = () => {
  return html`${towns.map((town) => html`<li>${town}</li>`)}`;
};

const townsWrapper = () => {
  return html`
    <ul>
      ${townsTemplate()}
    </ul>
  `;
};

function update() {
  render(townsWrapper(), rootDiv);
}

function onLoad(e) {
  e.preventDefault();

  const userInput = form.value.trim().split(', ');
  userInput.forEach((town) => towns.push(town));

  update();
  form.value = '';
}

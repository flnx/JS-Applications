import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const renderCats = () => html`
  <ul>
    ${cats.map(renderCatInfo)}
  </ul>`;

const renderCatInfo = (cat) => html`
  <li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
      <button class="showBtn" @click=${onStatusCode}>Show status code</button>
      <div class="status" style="display: none" id="100">
        <h4>Status Code: ${cat.statusCode}</h4>
        <p>${cat.statusMessage}</p>
      </div>
    </div>
  </li>
`;

const updateView = (catsTemplate) => {
  render(catsTemplate, document.getElementById('allCats'));
};

const template = renderCats();
updateView(template);

function onStatusCode(e) {
  e.preventDefault();

  const btn = e.target;
  const parent = e.target.parentElement;
  const details = parent.querySelector('.status');

  if (details.style.display == 'block') {
    btn.textContent = 'Show status code';
    details.style.display = 'none';
  } else {
    btn.textContent = 'Hide status code';
    details.style.display = 'block';
  }
}

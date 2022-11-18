import { contacts } from './contacts.js';
import { html, nothing, render } from '../../../node_modules/lit-html/lit-html.js';

const contactsElem = document.getElementById('contacts');

let card = (contact) => html`
  <div class="contact card">
    <div>
      <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
      <h2>Name: ${contact.name}</h2>
      <button id="${contact.id}" class="detailsBtn">Details</button>
      ${contact.active
        ? html`<div class="details">
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
          </div>`
        : nothing}
    </div>
  </div>
`;

update();

contactsElem.addEventListener('click', onDetails);

function onDetails(e) {
  const isDetailsBtn = e.target.classList.contains('detailsBtn');

  if (isDetailsBtn) {
    const id = Number(e.target.id) - 1;
    const contact = contacts[id];

    contact.active = !contact.active;

    update();
  }
}

function update() {
  render(contacts.map(card), contactsElem);
}

import { deleteItem, getItemDetails } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
    const owner = getUser()?._id;
    const fruitId = ctx.params.id;

    const data = await getItemDetails(fruitId);

    const session = {
        hasSession: owner && true,
        fruitOwner: data._ownerId,
        isOwner: () => session.fruitOwner == owner,
        ctx,
    };

    const onDelete = async (e) => {
        e.preventDefault();

        console.log('hi');

        if (!session.isOwner()) return;

        const confirmMessage = confirm('Are you sure you want to delete this fruit?');

        if (confirmMessage) {
            await deleteItem(fruitId);
            return ctx.page.redirect('/');
        }
    };

    ctx.render(detailsTemplate(data, session, onDelete));
};

const detailsTemplate = (data, session, onDelete) => html`
    <main>
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src="${data.imageUrl}" alt="example1" />
                <p id="details-title">${data.name}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p>${data.description}</p>
                        <p id="nutrition">Nutrition</p>
                        <p id="details-nutrition">${data.nutrition}</p>
                    </div>
                    <!--Edit and Delete are only for creator-->
                    ${session.isOwner()
                        ? html`<div id="action-buttons">
                              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                              <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                          </div>`
                        : html``}
                </div>
            </div>
        </section>
    </main>
`;

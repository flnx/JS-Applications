import { editItem, getItemDetails } from '../api/data.js';
import { html } from '../lib.js';

export const editPage = async (ctx) => {
    const data = await getItemDetails(ctx.params.id);

    const onEdit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const item = Object.assign({}, Object.fromEntries(form));

        const hasEmptyField = Object.values(item).some((x) => x == '');

        if (hasEmptyField) {
            return alert('All fields are required');
        }

        await editItem(ctx.params.id, item);
        e.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    };

    ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (data, onEdit) => html`
    <main>
        <!-- Edit Page (Only for logged-in users) -->
        <section id="edit">
            <div class="form">
                <h2>Edit Fruit</h2>
                <form class="edit-form" @submit=${onEdit}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Fruit Name"
                        .value=${data.name}
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        id="Fruit-image"
                        placeholder="Fruit Image URL"
                        .value=${data.imageUrl}
                    />
                    <textarea
                        id="fruit-description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                        .value=${data.description}
                    ></textarea>
                    <textarea
                        id="fruit-nutrition"
                        name="nutrition"
                        placeholder="Nutrition"
                        rows="10"
                        cols="50"
                        .value=${data.nutrition}
                    ></textarea>
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    </main>
`;

import { createItem } from '../api/data.js';
import { html } from '../lib.js';

export const createPage = (ctx) => {
    const onCreate = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const item = Object.assign({}, Object.fromEntries(form));

        const hasEmptyField = Object.values(item).some((x) => x == '');

        if (hasEmptyField) {
            return alert('All fields are required');
        }

        e.target.reset();
        await createItem(item);

        ctx.page.redirect('/catalog');
    };

    ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
    <main>
        <section id="create">
            <div class="form">
                <h2>Add Fruit</h2>
                <form class="create-form" @submit=${onCreate}>
                    <input type="text" name="name" id="name" placeholder="Fruit Name" />
                    <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
                    <textarea
                        id="fruit-description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                    ></textarea>
                    <textarea
                        id="fruit-nutrition"
                        name="nutrition"
                        placeholder="Nutrition"
                        rows="10"
                        cols="50"
                    ></textarea>
                    <button type="submit">Add Fruit</button>
                </form>
            </div>
        </section>
    </main>
`;

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
        ctx.page.redirect('/');
    };

    ctx.render(createTemplate(onCreate));
};

const createTemplate = (onCreate) => html`
    <main>
        <!-- Create Page (Only for logged-in users) -->
        <section id="create">
            <div class="form">
                <h2>Add Album</h2>
                <form class="create-form">
                    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
                    <input type="text" name="album" id="album-album" placeholder="Album" />
                    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
                    <input type="text" name="release" id="album-release" placeholder="Release date" />
                    <input type="text" name="label" id="album-label" placeholder="Label" />
                    <input type="text" name="sales" id="album-sales" placeholder="Sales" />
    
                    <button type="submit">post</button>
                </form>
            </div>
        </section>
    </main>
`;

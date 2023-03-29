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
    <section id="edit">
        <div class="form">
            <h2>Edit Album</h2>
            <form class="edit-form">
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

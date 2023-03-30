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
            return window.alert('All fields are required');
        }

        await editItem(ctx.params.id, item);
        e.target.reset();
        ctx.page.redirect(`/details/${ctx.params.id}`);
    };

    ctx.render(editTemplate(data, onEdit));
};

const editTemplate = (card, onEdit) => html`
    <main id="main-content">
        <section class="editPage">
            <form @submit=${onEdit}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input
                            id="name"
                            name="name"
                            class="name"
                            type="text"
                            .value="${card.name}"
                        />

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input
                            id="imgUrl"
                            name="imgUrl"
                            class="imgUrl"
                            type="text"
                            .value="${card.imgUrl}"
                        />

                        <label for="price" class="vhide">Price</label>
                        <input
                            id="price"
                            name="price"
                            class="price"
                            type="text"
                            .value="${card.price}"
                        />

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input
                            id="releaseDate"
                            name="releaseDate"
                            class="releaseDate"
                            type="text"
                            .value="${card.releaseDate}"
                        />

                        <label for="artist" class="vhide">Artist</label>
                        <input
                            id="artist"
                            name="artist"
                            class="artist"
                            type="text"
                            .value="${card.artist}"
                        />

                        <label for="genre" class="vhide">Genre</label>
                        <input
                            id="genre"
                            name="genre"
                            class="genre"
                            type="text"
                            .value="${card.genre}"
                        />

                        <label for="description" class="vhide">Description</label>
                        <textarea
                            name="description"
                            class="description"
                            rows="10"
                            cols="10"
                            .value=${card.description}
                        >
                        </textarea>
                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </main>
`;

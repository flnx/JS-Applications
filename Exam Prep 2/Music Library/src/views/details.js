import { deleteItem, getAlbumLikes, getItemDetails, getUserLikes, sendLike } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
    const owner = getUser()?._id;
    const albumId = ctx.params.id;

    const promises = [getItemDetails(albumId), getAlbumLikes(albumId)];

    if (owner) {
        promises.push(getUserLikes(albumId, owner));
    }

    const [data, albumTotalLikes, userLikes] = await Promise.all(promises);

    const session = {
        hasSession: owner && true,
        albumOwner: data._ownerId,
        isAlbumLikedByUser: userLikes == 1,
        isOwner: () => session.albumOwner == owner,
        ctx,
    };

    const onLike = async (e) => {
        e.preventDefault();
        if (!session.hasSession || session.isAlbumLikedByUser) return;

        await sendLike({ albumId });
        ctx.page.redirect(`/details/${albumId}`);
    };

    const onDelete = async (e) => {
        e.preventDefault();

        if (!session.isOwner()) return;

        const confirmMessage = confirm('Are you sure you want to delete this offer?');

        if (confirmMessage) {
            await deleteItem(albumId);
            return ctx.page.redirect('/');
        }
    };

    ctx.render(detailsTemplate(data, albumTotalLikes, session, onLike, onDelete));
};

const detailsTemplate = (data, albumLikes, session, onLike, onDelete) => html`
    <main>
        <!-- Details page -->
        <section id="details">
            <div id="details-wrapper">
                <p id="details-title">Album Details</p>
                <div id="img-wrapper">
                    <img src="${data.imageUrl}" alt="example1" />
                </div>
                <div id="info-wrapper">
                    <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
                    <p><strong>Album name:</strong><span id="details-album">${data.album}</span></p>
                    <p>
                        <strong>Release date:</strong
                        ><span id="details-release">${data.release}</span>
                    </p>
                    <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
                    <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
                </div>
                <div id="likes">Likes: <span id="likes-count">${albumLikes}</span></div>

                <!--Edit and Delete are only for creator-->
                ${session.isOwner() ? html`${ownerButtons(data._id, onDelete)}` : nothing}
                ${session.hasSession && !session.isAlbumLikedByUser && !session.isOwner()
                    ? html`${likeBtn(onLike)}`
                    : nothing}
            </div>
        </section>
    </main>
`;

const ownerButtons = (id, onDelete) => html`<div id="action-buttons">
    <a href="/edit/${id}" id="edit-btn">Edit</a>
    <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
</div>`;

const likeBtn = (onLike) => html`<div id="action-buttons">
    <a href="" id="like-btn" @click=${onLike}>Like</a>
</div>`;

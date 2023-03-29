import { deleteItem, getComments, getItemDetails, postAComment } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html, nothing } from '../lib.js';

export const detailsPage = async (ctx) => {
    const owner = getUser()?._id;

    const [data, comments] = await Promise.all([
        getItemDetails(ctx.params.id),
        getComments(ctx.params.id),
    ]);

    const session = {
        hasLoggedUser: owner ? true : false,
        memeOwnerId: data._ownerId,
        isOwner() {
            return owner == this.memeOwnerId ? true : false;
        },
        ctx,
    };

    ctx.render(detailsTemplate(onDelete, data, session, comments, onComment));
};

const onComment = async (ctx, e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const comment = formData.get('comment');


    if (comment == '') {
        return alert('You can\'t leave a blank comment')
    }

    await postAComment({ gameId: ctx.params.id, comment });

    ctx.page.redirect(`/details/${ctx.params.id}`);
};

const onDelete = async (ctx, e) => {
    e.preventDefault();
    const confirmMessage = confirm('Are you sure you want to delete this offer?');

    if (confirmMessage) {
        await deleteItem(ctx.params.id);
        ctx.page.redirect('/');
    }
};

const detailsTemplate = (onDelete, data, session, comments, onComment) => html`
<main>
    <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="./images/BackinBlack.jpeg" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">AC/DC</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">Back in Black</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">1980</span></p>
                <p><strong>Label:</strong><span id="details-label">Epic</span></p>
                <p><strong>Sales:</strong><span id="details-sales">26 million (50 million claimed)</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">0</span></div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                <a href="" id="like-btn">Like</a>
                <a href="" id="edit-btn">Edit</a>
                <a href="" id="delete-btn">Delete</a>
            </div>
        </div>
    </section>
</main>
`;

const commentsTemplate = (user) => html`
<li class="comment">
    <p>Content: ${user.comment}</p>
</li>
`;

const buttons = (onDelete, data, session) => html` 
<div class="buttons">
    <a href="/edit/${data._id}" class="button">Edit</a>
    <a href="javascript:void(0)" class="button" @click=${onDelete.bind(null, session.ctx)}>Delete</a>
</div>`;

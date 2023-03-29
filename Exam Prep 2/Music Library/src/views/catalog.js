import { getItems } from '../api/data.js';
import { getUser } from '../api/session.js';
import { html } from '../lib.js';

export const catalogPage = async (ctx) => {
    const data = await getItems();

    ctx.render(catalogTemplate(data));
};

const catalogTemplate = (items) => html`
    <main>
        <!-- Dashboard page -->
        <section id="dashboard">
            <h2>Albums</h2>
            <ul class="card-wrapper">
                <!-- Display a li with information about every post (if any)-->
                <li class="card">
                    <img src="./images/BackinBlack.jpeg" alt="travis" />
                    <p>
                        <strong>Singer/Band: </strong
                        ><span class="singer">AC/DC</span>
                    </p>
                    <p>
                        <strong>Album name: </strong
                        ><span class="album">Back in Black</span>
                    </p>
                    <p>
                        <strong>Sales:</strong
                        ><span class="sales"
                            >26 million (50 million claimed)</span
                        >
                    </p>
                    <a class="details-btn" href="">Details</a>
                </li>
                <li class="card">
                    <img src="./images/beatles-1.jpg" alt="travis" />
                    <p>
                        <strong>Singer/Band: </strong
                        ><span class="singer">The Beatles</span>
                    </p>
                    <p>
                        <strong>Album name: </strong
                        ><span class="album">1</span>
                    </p>
                    <p>
                        <strong>Sales:</strong
                        ><span class="sales"
                            >26 million (31 million claimed)</span
                        >
                    </p>
                    <a class="details-btn" href="">Details</a>
                </li>
                <li class="card">
                    <img src="./images/pink-floyd-the-wall.jpeg" alt="travis" />
                    <p>
                        <strong>Singer/Band: </strong
                        ><span class="singer">Pink Floyd</span>
                    </p>
                    <p>
                        <strong>Album name: </strong
                        ><span class="album">The Wall</span>
                    </p>
                    <p>
                        <strong>Sales:</strong
                        ><span class="sales"
                            >18 million (30 million claimed)</span
                        >
                    </p>
                    <a class="details-btn" href="">Details</a>
                </li>
            </ul>

            <!-- Display an h2 if there are no posts -->
            <h2>There are no albums added yet.</h2>
        </section>
    </main>
`;

// const memeTemplate = (card) => html`
//     <div class="allGames">
//         <div class="allGames-info">
//             <img src="${card.imageUrl}" />
//             <h6>${card.category}</h6>
//             <h2>${card.title}</h2>
//             <a href="/details/${card._id}" class="details-button">Details</a>
//         </div>
//     </div>
// `;

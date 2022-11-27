import { getMembers, getOwnerTeams, getOwnerThreeTeams } from '../api.js/data.js';
import * as util from '../util/util.js';

let html;

export const myTeamsPage = async (ctx) => {
  html = ctx.html;

  const query = new URLSearchParams(ctx.querystring);

  let page = Number(query.get('page')) || 1;
  let skip = (page - 1) * 3; 
  let pageSize = 3 * page;

  const owner = ctx.authCheck;
  const data = await getOwnerTeams(owner._id);

  if (data === false) {
    return alert('A network error has occured');
  }

  const refactoredData = data.map(x => {
    return { 
      _id: x.teamId,
      logoUrl: x.team.logoUrl,
      name: x.team.name,
      description: x.team.description,
      teamId: x.teamId
    }
  });

  const count = refactoredData.length;
  const teamMembers = await getMembers(refactoredData);
  const copyArr = refactoredData.slice(skip, pageSize);

  util.teamMembersCounter(copyArr, teamMembers);
  ctx.render(template(ctx.authCheck, copyArr, page, count));
};

const template = (authCheck, data, page, count) =>
  html`${authCheck ? myTeamsTemplate(data, page, count) : notFound()}`;

const myTeamsTemplate = (data, page, count) => html` 
<main>
  <section id="my-teams">
    <article class="pad-med">
      <h1>My Teams</h1>
    </article>

    ${data.length > 0 ? data.map(displayTeams) : browseTeams()}

  </section>
  <div class="buttons-wrapper">${buttonsTemplate(page, count)}</div>
</main>`;


const displayTeams = (x) => {
  return html`
    <article class="layout">
      <img src="${x.logoUrl}" class="team-logo left-col" />
      <div class="tm-preview">
        <h2>${x.name}</h2>
        <p>${x.description}</p>
        <span class="details">${x.members || 0} ${x.members == 1 ? 'Member' : 'Members'}</span>
        <div><a href="/details/${x.teamId}" class="action">See details</a></div>
      </div>
    </article>
  `;
};

const browseTeams = () => html` <article class="layout narrow">
  <div class="pad-med">
    <p>You are not a member of any team yet.</p>
    <p>
      <a href="/browse">Browse all teams</a> to join one, or use the button bellow to
      cerate your own team.
    </p>
  </div>
  <div class=""><a href="/create" class="action cta">Create Team</a></div>
</article>`;

const notFound = () => html` <main>
  <section>
    <h1>404 Not Found</h1>
  </section>
</main>`;

const buttonsTemplate = (page, count) => {
  return html`
    ${page < Math.ceil(count / 3)
      ? html`
          ${page == 1
            ? html`<a class="page-buttons disabled-btn" disabled="true">Previous</a>`
            : html`<a href="/myteams?page=${page - 1}" class="page-buttons">Previous</a>`}
          <a class="page-buttons">${page} out of ${Math.ceil(count / 3)}</a>
          <a href="/myteams?page=${page + 1}" class="page-buttons">Next</a>
        `
      : html`
          ${page == 1
            ? html`<a class="page-buttons disabled-btn" disabled="true">Previous</a>`
            : html`<a href="/myteams?page=${page - 1}" class="page-buttons">Previous</a></a>`}
          <a class="page-buttons">${page} out of ${Math.ceil(count / 3)}</a>
          <a class="page-buttons disabled-btn" disabled="true">Next</a>
        `}
  `;
};
import { getMembers, getTeams } from '../api.js/data.js';
import * as util from '../util/util.js';

let html;

export const browsePage = async (ctx) => {
  html = ctx.html;
  // puts the query params into an object
  const query = new URLSearchParams(ctx.querystring);

  // Parses the page into a num and sets default 1 to avoid when NaN
  const currentPage = Number(query.get('page')) || 1;

  const data = await getTeams(currentPage);

  if (data === false) {
    return alert('A Network Error has occured.');
  }

  const { count, teams } = data;

  const teamMembers = await getMembers(teams);
  util.teamMembersCounter(teams, teamMembers);

  const templateArr = browseTemplate(ctx.authCheck, teams, currentPage, count);

  ctx.render(templateArr);
};

export const browseTemplate = (authCheck, data, page, count) => {
  return html` <main>
    <section id="browse">
      <article class="pad-med">
        <h1>Team Browser</h1>
      </article>

      ${authCheck? html`<div class="create-container"><a href="/create">Create Team</a></div>`: null}

      ${data.map(teamsTemplate)}
    </section>

    <div class="buttons-wrapper">${buttonsTemplate(page, count)}</div>
  </main>`;
};

const teamsTemplate = (data) => {
  return html` <article data-owner-id="${data._ownerId}" class="layout">
    <img src="${data.logoUrl}" class="team-logo left-col" />
    <div class="tm-preview">
      <h2>${data.name}</h2>
      <p>${data.description}</p>
      <span class="details"
        >${data.members || 0} ${data.members == 1 ? 'Member' : 'Members'}</span
      >
      <div><a href="/details/${data._id}" class="action">See details</a></div>
    </div>
  </article>`;
};

const buttonsTemplate = (page, count) => {
  return html`
    ${page < Math.ceil(count / 3)
      ? html`
          ${page == 1
            ? html`<a class="page-buttons disabled-btn" disabled="true">Previous</a>`
            : html`<a href="/browse?page=${page - 1}" class="page-buttons">Previous</a>`}
          <a class="page-buttons">${page} out of ${Math.ceil(count / 3)}</a>
          <a href="/browse?page=${page + 1}" class="page-buttons">Next</a>
        `
      : html`
          ${page == 1
            ? html`<a class="page-buttons disabled-btn" disabled="true">Previous</a>`
            : html`<a href="/browse?page=${
                page - 1
              }" class="page-buttons">Previous</a></a>`}
          <a class="page-buttons">${page} out of ${Math.ceil(count / 3)}</a>
          <a class="page-buttons disabled-btn" disabled="true">Next</a>
        `}
  `;
};
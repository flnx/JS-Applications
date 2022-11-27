import { getDetails, getMembersForSpecificTeam } from '../api.js/data.js';
import * as user from '../api.js/user.js';
import { filterByStatus } from '../util/util.js';

let html = null;

export const detailsPage = async (ctx) => {
  html = ctx.html;

  const username = ctx.authCheck.username;
  const sessionId = ctx.authCheck._id || null;

  const [team, members] = await Promise.all([
    getDetails(ctx.params.id),
    getMembersForSpecificTeam(ctx.params.id),
  ]);


  if (team === false) {
    return alert('A network Error has occured. Please try again later...');
  }

  const onJoin = async (e, ) => { 
    e.preventDefault();

    await user.memberRequest({ _id: ctx.params.id });
    ctx.page.redirect(`/details/${ctx.params.id}`)
  } 
  
  const onCancel = async (e) => {
    e.preventDefault();

    const userData = members.find(x => x._ownerId == sessionId);

    await user.cancelRequest(userData._id, { teamId: userData.teamId });

    ctx.page.redirect(`/details/${ctx.params.id}`)
  } 

  const onRemove = async (userData, e) => {
    e.preventDefault();

    await user.cancelRequest(userData._id, { teamId: userData.teamId });
    ctx.page.redirect(`/details/${ctx.params.id}`)
  } 

  const onApprove = async (userData, e) => {
    e.preventDefault();

    userData.status = "member";

    await user.approveRequest(userData);  
    ctx.page.redirect(`/details/${ctx.params.id}`);
  }; 

  ctx.render(detailsTemplate(sessionId, members, team, username, onJoin, onCancel, onRemove, onApprove));
};

const detailsTemplate = (owner, members, team, username, onJoin, onCancel, onRemove, onApprove) => {
  const { teamMembers, pendingMembers, isMember, isPending } = filterByStatus(members, owner);

  const counter = teamMembers.length;

  return html`
  <main>
    <section id="team-home">
      <article class="layout">
        <img src="${team.logoUrl}" class="team-logo left-col" />
        <div class="tm-preview">
          <h2>${team.name}</h2>
          <p>${team.description}</p>
          <span class="details">${counter} ${counter == 1 ? 'Member' : 'Members'}</span>
          ${owner ? sessionButtonsTemplate(owner, team._ownerId, isMember, onJoin, isPending, onCancel, team) : null}
        </div>
        <div class="pad-large">
          <h3>Members</h3>
          <ul class="tm-members">
            ${isMember ? html`<li class="team-member">${username}</li>` : null}
            ${owner === team._ownerId
                ? teamMembers.map((m) => adminTeamMembersTemplate(m, owner, onRemove))
                : teamMembers.map((m) => userMembersTemplate(m, owner))
            }
            </li>
          </ul>
        </div>
        ${owner === team._ownerId ? memberRequestsTemplate(pendingMembers, onRemove, onApprove) : null}
      </article>
    </section>
  </main>
  `;
};

const sessionButtonsTemplate = (owner, teamOwner, isUserTeamMember, onJoin, isUserPending, onCancel, team) => {  
  return html`<div>
    ${owner == teamOwner
      ? html`<a href="/edit/${team._id}" class="action">Edit team</a>`
      : html`${isUserTeamMember
          ? html`<a class="action invert">Leave team</a>`
          : html` ${isUserPending ? cancelButton(onCancel) : joinButton(onJoin)}
        `}
      `}
  </div>`;
};

const cancelButton = (onCancel) => html`Membership pending. <a href="#" @click=${onCancel}>Cancel request</a>`
const joinButton = (onJoin) => html`<a @click=${onJoin} class="action">Join team</a>`

const memberRequestsTemplate = (pendingMembers, onRemove, onApprove) => {
  if (pendingMembers.length == 0) {
    return null;
  }

  return html`
    <div class="pad-large">
      <h3>Membership Requests</h3>
      <ul class="tm-members">
        ${pendingMembers.map((member) => {
          return html`<li>
            <a>${member.user.username}</a>
            <a @click=${onApprove.bind(null, member)} class="tm-control action">Approve</a>
            <a @click=${onRemove.bind(null, member)} class="tm-control action">Decline</a>
          </li>`;
        })}
      </ul>
    </div>
  `;
};

const adminTeamMembersTemplate = (member, owner, onRemove) => {
  return member._ownerId != owner
    ? html` <li>
        ${member.user.username}
        <a href="#" @click=${onRemove.bind(null, member)} class="tm-control action">Remove from team</a>
      </li>`
    : null;
};

const userMembersTemplate = (member, owner) => {
  return member._ownerId != owner ? html`<li>${member.user.username}</li>` : null;
};
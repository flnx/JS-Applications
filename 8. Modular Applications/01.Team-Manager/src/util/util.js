export const teamMembersCounter = (teams, members) => {
  members.forEach((x) => {
    const memberTeamId = x.teamId;

    teams.forEach((team) => {
      if (!Object.hasOwn(team, 'members')) {
        team.members = 0;
      }

      if (team._id == memberTeamId) {
        team.members++;
      }
    });
  });
};

export const filterByStatus = (members, owner) => {
  const teamMembers = [];
  let isMember = false;

  const pendingMembers = [];
  let isPending = false;


  members.forEach(member => {
    if (member.status == "member") {
      teamMembers.push(member)
      isMember = owner == member.user._id ? true : isMember;
    } else if (member.status == 'pending') {
      pendingMembers.push(member)
      isPending = owner == member.user._id ? true : isPending;
    }
  });

  return {
    teamMembers,
    pendingMembers,
    isMember,
    isPending
  }
};
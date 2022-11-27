import * as api from './api.js';

const pageSize = 3;
const userThreeTeams = (id, skip) => `data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams&pageSize=${pageSize}&offset=${skip}`

const endpoints = {
  countTeams: 'data/teams?count',
  update: (id) => `data/teams/${id}`,
  teams: (skip) => `data/teams/?pageSize=${pageSize}&offset=${skip}`,
  teamById: (id1, id2, id3) => encodeURIComponent(` IN ("${id1}", "${id2}", "${id3}") AND status="member"`),
  details: (id) => `data/teams/${id}`,
  teamMembersInfo: (id) => `data/members?where=teamId%3D%22${id}%22&load=user%3D_ownerId%3Ausers`,
  userTeams: (id) => `data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
  userThreeTeams
}

export const getOwnerThreeTeams = async (id, page) => {
  const skip = (page - 1 ) * pageSize;

  const response = await api.get(endpoints.userThreeTeams(id, skip));

  if (typeof response == 'object') {
    return response;
  }

  return false;
} 

export const getOwnerTeams = async (id, page) => {
  // const skip = (page - 1 ) * pageSize;
  const response = await api.get(endpoints.userTeams(id));

  if (typeof response == 'object') {
    return response;
  }

  return false;
} 

export const getTeams = async (page) => {
  const skip = (page - 1) * pageSize;

  const [teams, count] = await Promise.all([
    api.get(endpoints.teams(skip)),
    api.get(endpoints.countTeams),
  ]);
  
  if (typeof teams == 'object') {
    return {
      teams,
      count,
    };
  }

  return false;
};

export const getMembers = async (teams) => {
  const query = 'data/members?where=teamId';
  
  const teamIds = Object.values(teams).map((team) => team._id);
  const [id1, id2, id3] = teamIds;
  const path = query + endpoints.teamById(id1, id2, id3);

  const response = await api.get(path);
  
  if (typeof response == 'object') {
    return response;
  }

  return false;
};


export const getDetails = async (id) => {
  const response = await api.get(endpoints.details(id));

  if (typeof response == 'object') {
    return response;
  }

  return false;
} 

export const getMembersForSpecificTeam = async (id) => {
  const response = await api.get(endpoints.teamMembersInfo(id));

  if (typeof response == 'object') {
    return response;
  }

  return false;
} 

export const updateTeamRequest = async (id, data) => {

  const response = await api.put(endpoints.update(id), data);

  if (typeof response == 'object') {
    return response;
  }

  throw response;
}

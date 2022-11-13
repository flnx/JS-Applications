const greeting = document.querySelector('#welcome-msg');
const user = document.querySelectorAll('.user');
const guest = document.querySelectorAll('.guest');

export const getUserData = () => {
  let userDataInfo = JSON.parse(sessionStorage.getItem('userData')) || null;
  let accessToken = userDataInfo ? userDataInfo.accessToken : null;

  return {
    userDataInfo,
    accessToken
  }
};

export const checkAuthorization = () => {
  const sessionInfo = getUserData();
  const userData = sessionInfo.userDataInfo
  const token = getUserData().accessToken;

  if (userData && token) {
    user.forEach((x) => (x.style.display = 'block'));
    guest.forEach((x) => (x.style.display = 'none'));
    greeting.textContent = `Welcome, ${userData.email}`;
  } else {
    user.forEach((x) => (x.style.display = 'none'));
    guest.forEach((x) => (x.style.display = 'block'));
    greeting.textContent = '';
  }
};


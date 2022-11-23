const guest = document.getElementById('guest');
const user = document.getElementById('user');

export function checkUserAuth() {
  const isOwner = getSessionInfo();

  if (isOwner) {
    user.style.display = 'inline-block';
    guest.style.display = 'none';
  } else {
    user.style.display = 'none';
    guest.style.display = 'inline-block';
  }
};

export function getSessionInfo() {
  const data = JSON.parse(sessionStorage.getItem('userData'));
  const token = data ? data.accessToken : null;

  if (data && token) {
    return data._id;
  } 

  return false;
}



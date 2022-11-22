export function userAuth() {
  const userSession = JSON.parse(sessionStorage.getItem('userData'));
  
  if (userSession) {
    document.querySelectorAll('.user').forEach((x) => (x.style.display = 'block'));
    document.querySelectorAll('.guest').forEach((x) => (x.style.display = 'none'));
  } else {
    document.querySelectorAll('.guest').forEach((x) => (x.style.display = 'block'));
    document.querySelectorAll('.user').forEach((x) => (x.style.display = 'none'));
  }
}
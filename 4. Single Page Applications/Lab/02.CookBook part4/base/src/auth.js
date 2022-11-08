export function checkUserPermissions() {
  if (sessionStorage.getItem('authToken') != null) {
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
  } else {
    document.getElementById('guest').style.display = 'inline-block';
    document.getElementById('user').style.display = 'none';
  }
}

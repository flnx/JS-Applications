export function init(links) {
  const main = document.getElementById('main');
  const nav = document.querySelector('.navbar');

  nav.addEventListener('click', onNavigation);
  const ctx = {
    showSection,
    goTo,
  };

  return ctx;

  function onNavigation(e) {
    e.preventDefault();

    let target = e.target;

    if (target.tagName == 'IMG') {
      target = target.parentElement;
    }

    if (target.tagName !== 'A') {
      return;
    }

    const url = new URL(target.href);
    goTo(url.pathname);
  }

  function goTo(path, id) {
    const view = links[path];

    if (typeof view == 'function') {
      view(ctx, id);
    }
  }

  function showSection(section) {
    userAuth();
    main.replaceChildren(section);
  }

  function userAuth() {
    const userSession = JSON.parse(sessionStorage.getItem('userData'));
    
    if (userSession) {
      document.querySelectorAll('.user').forEach((x) => (x.style.display = 'block'));
      document.querySelectorAll('.guest').forEach((x) => (x.style.display = 'none'));
    } else {
      document.querySelectorAll('.guest').forEach((x) => (x.style.display = 'block'));
      document.querySelectorAll('.user').forEach((x) => (x.style.display = 'none'));
    }
  }
}

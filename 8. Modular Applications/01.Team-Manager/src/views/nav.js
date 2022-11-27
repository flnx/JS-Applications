export const navTemplate = (html, auth, pathname) => {
  const isAuthenticated = auth();
  let path = pathname.slice(1);


  return html`
    <header id="titlebar" class="layout">
      <a href="/" class="site-logo">Team Manager</a>
      <nav>
        <a href="/browse" class="action ${path == 'browse' ? 'active' : null}">Browse Teams</a>
        ${isAuthenticated == false
          ? html` 
              <a href="/login" class="action ${path == 'login' ? 'active' : null}">Login</a>
              <a href="/register" class="action ${path == 'register' ? 'active' : null}">Register</a>`
          : null}
        ${isAuthenticated != false
          ? html`
              <a href="/myteams" class="action ${path == 'myteams' ? 'active' : null}">My Teams</a>
              <a href="/logout" class="action">Logout</a>
            `
          : null}
      </nav>
    </header>
  `;
};

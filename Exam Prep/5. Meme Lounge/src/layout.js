import { render } from './lib.js';
import { getUser } from './api/session.js';
import { navTemplate } from './views/nav.js';
import { footer } from './views/footer.js';
import { notify } from './notification.js';

const container = document.getElementById('container');

export const ctxDecorator = (ctx, next) => {
  ctx.render = ctxRender;
  ctx.authCheck = getUser();
  ctx.notify = notify;
  next();
};

const ctxRender = (section) => render([navTemplate(getUser), section, footer()], container);
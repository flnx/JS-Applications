import { render } from './lib.js';
import { getUser } from './api/session.js';
import { navTemplate } from './views/nav.js';
// import { footer } from './views/footer.js';

const container = document.getElementById('box');

export const ctxDecorator = (ctx, next) => {
  ctx.render = ctxRender;
  ctx.authCheck = getUser();
  next();
};

const ctxRender = (section) => render([navTemplate(getUser), section], container);
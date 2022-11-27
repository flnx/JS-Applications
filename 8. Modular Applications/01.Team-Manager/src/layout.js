import { render, html } from '../node_modules/lit-html/lit-html.js';
import { navTemplate } from './views/nav.js';
import { authCheck } from './views/auth.js';
import { footerTemplate } from './views/footer.js'
import { inputValidator } from './formHandlers/userFormValidator.js';

const container = document.getElementById('content');

const nav = navTemplate.bind(null, html);
const footer = footerTemplate(html);
let pathname = null;


export const ctxDecorator = (ctx, next) => {
  pathname = ctx.pathname;
  ctx.inputValidator = inputValidator;
  ctx.html = html;
  ctx.render = ctxRender;
  ctx.authCheck = authCheck();
  
  next();
};

const ctxRender = (section) => render([nav(authCheck, pathname), section, footer], container);
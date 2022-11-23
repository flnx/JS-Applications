import { createItem } from '../api/data.js';
import { validateFields } from '../api/formValidation.js';
import { formTemplate } from './litTemplates.js';

export function createPage(ctx) {
  const section = formTemplate('', onSubmit, ctx.html);
  ctx.render(section);

  async function onSubmit(e) {
    e.preventDefault();
  
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);
  
    const errors = validateFields(formData);
  
    if (errors.length == 0) {
      await createItem(formData);
      e.target.reset();
      ctx.page.redirect('/');
    } else {
      ctx.render(formTemplate(errors, onSubmit, ctx.html));
    }
  }
}


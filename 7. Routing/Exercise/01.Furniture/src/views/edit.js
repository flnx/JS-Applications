import { getItemDetails, updateItem } from '../api/data.js';
import { validateFields } from '../api/formValidation.js';
import { formTemplate } from './litTemplates.js';

export async function editPage(ctx) {
  const details = await getItemDetails(ctx.params.id);
  
  const section = formTemplate('', onSubmit, ctx.html, details);
  ctx.render(section);

  const form = document.querySelectorAll('form input');

  form[0].value = details.make;
  form[1].value = details.model;
  form[2].value = details.year;
  form[3].value = details.description;
  form[4].value = details.price;
  form[5].value = details.img;
  form[6].value = details.material || '';

  async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    const errors = validateFields(formData);

    if (errors.length == 0) {
      await updateItem(ctx.params.id, formData);

      e.target.reset();
      ctx.page.redirect('/');
    } else {
      ctx.render(formTemplate(errors, onSubmit, ctx.html));
    }
  }
}

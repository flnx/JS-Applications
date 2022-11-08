import { getRecipeById, showDetails } from './details.js';

let main;
let section;
let recipeId;

export function setupEdit(mainSec, editSec) {
  main = mainSec;
  section = editSec;

  const trimmer = (x) => x.split('\n').map((l) => l.trim()).filter((l) => l != '')


  const form = editSec.querySelector('form');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit(
      [...formData.entries()].reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {})
    );
  });

  async function onSubmit(data) {
    const body = JSON.stringify({
      name: data.name,
      img: data.img,
      ingredients: trimmer(data.ingredients),
      steps: trimmer(data.steps)
    });

    console.log(body.ingredients);

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
      return alert("You're not logged in!");
    }

    try {
      const response = await fetch('http://localhost:3030/data/recipes/' + recipeId, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body,
      });

      if (response.status == 200) {
        showDetails(recipeId);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err) {
      alert(err.message);
      console.error(err.message);
    }
  }
}

export async function onEditPage(id) {
  main.replaceChildren(section);

  recipeId = id;
  const recipe = await getRecipeById(recipeId);

  section.querySelector('[name="name"]').value = recipe.name;
  section.querySelector('[name="img"]').value = recipe.img;
  section.querySelector('[name="ingredients"]').value = recipe.ingredients.join('\n');
  section.querySelector('[name="steps"]').value = recipe.steps.join('\n');
}

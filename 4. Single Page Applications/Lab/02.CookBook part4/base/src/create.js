import { createRecipeCard } from './cards.js';
import { getRecipeById } from './details.js';

let main;
let recipeSection;

export function setupRecipe(mainSec, targetSec) {
  main = mainSec;
  recipeSection = targetSec;

  const form = targetSec.querySelector('form');

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
      ingredients: data.ingredients
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l != ''),
      steps: data.steps
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l != ''),
    });

    const token = sessionStorage.getItem('authToken');
    if (token == null) {
      return alert("You're not logged in!");
    }

    try {
      const response = await fetch('http://localhost:3030/data/recipes', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body,
      });

      if (response.status == 200) {
        recipeSection.replaceChildren();
        main.replaceChildren(recipeSection);
        
        const data = await response.json();
        const recipeId = data._id;
        const recipe = await getRecipeById(recipeId);

        recipeSection.appendChild(createRecipeCard(recipe));
      } else {
        throw new Error(await response.json());
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}

export function onCreateRecipe() {
  main.replaceChildren();
  main.appendChild(recipeSection);
}

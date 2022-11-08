import { e } from "./domManipulations.js";
import { createRecipeCard } from "./cards.js";

let main;
let section;

export async function getRecipes() {
  const response = await fetch('http://localhost:3030/data/recipes');
  const recipes = await response.json();

  return recipes;
}

export async function getRecipeById(id) {
  const response = await fetch('http://localhost:3030/data/recipes/' + id);
  const recipe = await response.json();

  return recipe;
}

export async function deleteRecipeById(id) {
  const token = sessionStorage.getItem('authToken');

  try {
      const response = await fetch('http://localhost:3030/data/recipes/' + id, {
          method: 'delete',
          headers: {
              'X-Authorization': token
          }
      });

      if (response.status != 200) {
          const error = await response.json();
          throw new Error(error.message);
      }
      section.replaceChildren(e('article', {}, e('h2', {}, 'Recipe deleted')));
      main.replaceChildren(section);
    } catch (err) {
      alert(err.message);
  }
}

export function setupDetails(targetMain, targetSection) {
    main = targetMain;
    section = targetSection;
}

export function createRecipePreview(recipe) {
  const result = e(
    'article',
    { className: 'preview', onClick: () => showDetails(recipe._id)},
    e('div', { className: 'title' }, e('h2', {}, recipe.name)),
    e('div', { className: 'small' }, e('img', { src: recipe.img }))
  );

  return result;
}


export async function showDetails(id) {
  main.replaceChildren();
  
  const fullRecipe = await getRecipeById(id);
  section.replaceChildren(createRecipeCard(fullRecipe));
  main.appendChild(section)
}

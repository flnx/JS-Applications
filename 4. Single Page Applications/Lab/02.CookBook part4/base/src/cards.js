import { e } from "./domManipulations.js";
import { deleteRecipeById } from "./details.js";
import { onEditPage } from "./edit.js";


export function createRecipeCard(recipe) {
  const result = e('article', {},
    e('h2', {}, recipe.name),
    e('div', { className: 'band' },
    e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
    e('div', { className: 'ingredients' },
    e('h3', {}, 'Ingredients:'),
    e('ul', {}, recipe.ingredients.map((i) => e('li', {}, i))))),
    e('div',  { className: 'description' },
    e('h3', {}, 'Preparation:'),recipe.steps.map((s) => e('p', {}, s)))
  );

  const userId = sessionStorage.getItem('userId');
  if (userId != null && recipe._ownerId == userId) {
      result.appendChild(e('div', { className: 'controls' },
          e('button', { onClick: () => onEditPage(recipe._id) }, '\u270E Edit'),
          e('button', { onClick: onDelete }, '\u2716 Delete'),
      ));
  }

  function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
    if (confirmed) {
        deleteRecipeById(recipe._id);
    }
}

  return result;
}
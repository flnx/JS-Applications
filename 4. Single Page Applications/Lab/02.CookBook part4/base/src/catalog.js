import { getRecipes, createRecipePreview } from './details.js';

let section;
let main;

export function catalogInfo(mainSec, catalogSec) {
  main = mainSec;
  section = catalogSec;
}

export async function setupCatalog() {
  main.replaceChildren();
  section.replaceChildren();
  main.appendChild(section);

  const recipes = await getRecipes();
  const cards = recipes.map(createRecipePreview);

  const fragment = document.createDocumentFragment();

  cards.forEach((c) => fragment.appendChild(c));
  section.appendChild(fragment);
}
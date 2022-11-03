window.addEventListener('load', executor);

function getRecipesPreview() {
  const url = 'http://localhost:3030/jsonstore/cookbook/recipes';
  const data = fetch(url)
    .then((res) => res.json())
    .then((data) => data);
  return data;
}

function getRecipesById(id) {
  const url = `http://localhost:3030/jsonstore/cookbook/details/${id}/`;
  const data = fetch(url)
    .then((res) => res.json())
    .then((data) => data);
  return data;
}

function executor() {
  const mainElem = document.querySelector('main');
  mainElem.querySelector('p').remove();
  const data = getRecipesPreview();

  data.then((recpsData) => {
    const recipes = Object.values(recpsData);
    for (let r of recipes) {
      mainElem.appendChild(createPreview(r.name, r.img, r._id));
    }
  });
}

function createPreview(title, imgSrc, id) {
  const article = createElement('preview', 'article');
  const divTitle = createElement('title', 'div');
  const h2 = createElement('', 'h2', 'ADDTITLE');
  const divSmall = createElement('small', 'div', title);
  const img = document.createElement('img');
  img.src = imgSrc;

  append(divTitle, h2);
  append(divSmall, img);
  append(article, divTitle, divSmall);

  article.addEventListener('click', () => {
    const data = getRecipesById(id);
    data.then((r) => {
      const art = createRecipe(r.name, r.ingredients, r.steps, r.img, r._id);
      article.replaceWith(art)
    });
  });

  return article;
}

function createRecipe(title, ingr, prepSteps, imgSrc) {
  const article = document.createElement('article');
  const h2 = createElement('', 'h2', title);
  const divBand = createElement('band', 'div');
  const divThumb = createElement('thumb', 'div');

  const img = document.createElement('img');
  img.src = imgSrc;
  divThumb.appendChild(img);

  const divIngredients = createElement('ingredients', 'div');
  const h3ingredients = createElement('', 'h3', 'Ingredients:');
  const ul = document.createElement('ul');
  const divDesc = createElement('description', 'div');
  const h3Preparation = createElement('', 'h3', 'Preparation');

  append(divIngredients, h3ingredients, ul);
  append(divBand, divThumb, divIngredients);
  append(divDesc, h3Preparation);
  append(article, h2, divBand, divDesc);

  ingr.map((x) => ul.appendChild(createElement('', 'li', x)));
  prepSteps.map((x) => divDesc.appendChild(createElement('', 'p', x)));
  return article;
}

function append(parent, ...elements) {
  elements.map((e) => parent.appendChild(e));
}

function createElement(className, type, content) {
  const element = document.createElement(type);
  if (className) {
    element.classList.add(className);
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}
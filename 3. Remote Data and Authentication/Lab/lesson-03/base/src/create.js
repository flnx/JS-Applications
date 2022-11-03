const form = document.querySelector('form');
form.addEventListener('submit', createRecipe);

async function createRecipe(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const name = formData.get('name').trim();
  const img = formData.get('img').trim();
  const ingredients = formData.get('ingredients').trim().split('\n');
  const steps = formData.get('steps').trim().split('\n');

  const recipe = { name, img, ingredients, steps };

  const token = sessionStorage.getItem('accessToken');

  if (token == null) {
    alert('You need to be logged in to create recipes!');
    return (window.location = 'login.html');
  }

  try {
    const response = await fetch('http://localhost:3030/data/recipes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(recipe),
    });

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    window.location = 'index.html';
  } catch (err) {
    alert(err.message);
  }
}

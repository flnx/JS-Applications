async function solution() {
  try {
    const main = document.getElementById('main');
    const res = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const data = await res.json();

    if (!res.ok) {
      throw new Error('Error!');
    }

    data.forEach((x) => main.appendChild(createElements(x)));
  } catch (err) {
    console.log(err.message);
  }
}

function createElements({ _id, title }) {
  const div = document.createElement('div');
  div.classList.add('accordion');
  const id = _id;

  div.innerHTML = `<div class="head">
  <span>${title}</span>
  <button class="button" id="${id}">More</button>
  </div>
  <div class="extra">
  <p>Scalable Vector Graphics .....</p>
  </div>
  `;

  const btn = div.querySelector('button');
  const extraDiv = div.querySelector('.extra');
  const hiddenDiv = div.querySelector('.extra > p');

  btn.addEventListener('click', async () => {
    const url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error();
    }

    const contentData = await res.json();
    hiddenDiv.textContent = contentData.content;

    if (btn.textContent == 'More') {
      extraDiv.style.display = 'block';
      btn.textContent = 'Less';
    } else {
      btn.textContent = 'More';
      extraDiv.style.display = 'none';
    }
  });
  return div;
}

solution();

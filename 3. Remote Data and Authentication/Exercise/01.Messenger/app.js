const url = 'http://localhost:3030/jsonstore/messenger';
const textarea = document.getElementById('messages');
const [author, message] = document.querySelectorAll('#controls input');

function attachEvents() {
  document.getElementById('refresh').addEventListener('click', onRefresh);
  document.getElementById('submit').addEventListener('click', onSubmit);
}

async function onSubmit() {
  if (author.value == '' || message.value == '') {
    throw new Error("Fields can't be empty!");
  }

  const body = {
    author: author.value,
    content: message.value,
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    author.value = '';
    message.value = '';
  } catch (err) {
    alert(err.message);
  }
}

async function onRefresh() {
  try {
    const res = await fetch(url);

    if (res.ok == false) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    const msgs = Object.values(data);
    textarea.textContent = msgs.map((x) => `${x.author}: ${x.content}`).join('\n');
  } catch (err) {
    alert(err.message);
  }
}

attachEvents();

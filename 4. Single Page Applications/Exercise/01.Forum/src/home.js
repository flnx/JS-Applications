import { createPostPreview } from './dom.js';

const main = document.querySelector('main'); // new
const form = document.querySelector('main form');
const postsContainer = document.querySelector('.topic-title');
document.querySelector('nav li a').addEventListener('click', showHome)



export function showHome() {
  document.querySelector('.container').replaceChildren(main);
  loadTopics();
}

export function onCancel(e) {
  e.preventDefault();
  form.reset();
}

export async function onPost(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { topicName, username, postText } = Object.fromEntries(formData);

  try {
    if (topicName == '' || username == '' || postText == '') {
      throw new Error('All fields are required');
    }

    const body = {
      title: topicName,
      username,
      content: postText,
      date: new Date,
    };

    const response = await fetch(
      'http://localhost:3030/jsonstore/collections/myboard/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();

    if (response.status != 200) {
      throw new Error(data.message);
    }

    loadTopics();
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}

export async function loadTopics() {
  try {
    const response = await fetch(
      'http://localhost:3030/jsonstore/collections/myboard/posts'
    );
    const data = await response.json();

    if (response.ok == false) {
      throw new Error(data.message);
    }

    const allPosts = Object.values(data).map(createPostPreview);
    postsContainer.replaceChildren(...allPosts);
  } catch (err) {
    alert(err.message);
  }
}

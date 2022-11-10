import { createCommentsPreview } from './dom.js';

const section = document.querySelector('.theme-content').parentElement;
const commentForm = document.querySelector('.answer form');

const commentsWrapper = document.getElementById('user-comment');

const url = 'http://localhost:3030/jsonstore/collections/myboard/';

commentForm.addEventListener('submit', postComment);

const post = {
  container: section.querySelector('.comment'),
  themeName: section.querySelector('.theme-name h2'),
  name: section.querySelector('p span'),
  date: section.querySelector('p time'),
  content: section.querySelector('.post-content'),
};

section.remove();

export async function showPost(id) {
  const postId = id.getAttribute('data-id');

  try {
    const res = await fetch(url + 'posts/' + postId);
    const data = await res.json();

    if (data.ok == false) {
      throw new Error(data.message);
    }

    showComments();

    post.container.dataset.id = postId;
    post.themeName.textContent = data.title;
    post.name.textContent = data.username;
    post.date.textContent = data.date;
    post.content.textContent = data.content;
    commentForm.dataset.id = postId;
    document.querySelector('main').parentElement.replaceChildren(section);
  } catch (err) {
    alert(err.message);
  }
}

async function showComments() {
  try {
    const res = await fetch(url + 'comments/');
    const data = await res.json();

    if (res.ok == false) {
      throw new Error(data.message);
    }
    const postId = commentForm.getAttribute('data-id');
    const postComments = Object.values(data).filter((x) => x.commentId == postId);

    commentsWrapper.replaceChildren(...postComments.map(createCommentsPreview));
  } catch (err) {
    alert(err.message);
  }
}

export async function postComment(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { postText, username } = Object.fromEntries(formData);

  try {
    if (postText == '' || username == '') {
      throw new Error("Fields can't be empty!");
    }
    const commentId = commentForm.getAttribute('data-id');

    const body = {
      postText,
      username,
      commentId,
      date: new Date(),
    };

    const res = await fetch(url + 'comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    showComments();
    commentForm.reset();

    if (res.ok == false) {
      throw new Error(data.message);
    }
  } catch (err) {
    alert(err.message);
  }
}
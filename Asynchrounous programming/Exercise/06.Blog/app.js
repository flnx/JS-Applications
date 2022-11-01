const select = document.getElementById('posts');
const title = document.getElementById('post-title');
const postComments = document.getElementById('post-comments');
document.getElementById('btnLoadPosts').addEventListener('click', getPosts);
document.getElementById('btnViewPost').addEventListener('click', getComments);

function loadPosts({ id, title }) {
  const option = document.createElement('option');
  option.value = id;
  option.textContent = title;
  select.appendChild(option);
}

function loadComments({ id, text }) {
  const li = document.createElement('li');
  li.textContent = text;
  li.id = id;
  postComments.appendChild(li);
}

async function getPosts() {
  try {
    const res = await fetch('http://localhost:3030/jsonstore/blog/posts');

    if (!res.ok) {
      throw new Error('Error')
    }

    const data = await res.json();
    select.innerHTML = '';
    Object.values(data).forEach((obj) => loadPosts(obj));
  } catch (err) {
    console.log(err.message);
  }
}

async function getComments() {
  try {
    const res = await fetch('http://localhost:3030/jsonstore/blog/comments');

    if (!res.ok) {
      throw new Error('Error')
    }

    const data = await res.json();
    
    const comments = Object.values(data)
      .filter((x) => x.postId == select.value);

    const postTitle = Array.from(select.options)
      .find((x) => x.value == select.value);

    title.textContent = postTitle.textContent;
    setBodyDetails();

    postComments.innerHTML = '';
    Object.values(comments).forEach((x) => loadComments(x));
  } catch (err) {
    console.log(err.message);
  }
}

async function setBodyDetails() {
  try {
    const res = await fetch(`http://localhost:3030/jsonstore/blog/posts`);

    if (!res.ok) {
      throw new Error('Error')
    }
  
    const data = await res.json();
    const bodyTitle = Object.values(data)
      .find((obj) => obj.id == select.value);

    document.getElementById('post-body').textContent = bodyTitle.body;
  } catch (err) {
    console.log(err.message);
  }
}
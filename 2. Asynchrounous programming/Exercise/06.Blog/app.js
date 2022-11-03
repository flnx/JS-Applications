const select = document.getElementById('posts');
const title = document.getElementById('post-title');
const postComments = document.getElementById('post-comments');
const body = document.getElementById('post-body');

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
    const data = await res.json();
    select.innerHTML = '';

    Object.values(data).forEach((obj) => loadPosts(obj));
  } catch (error) {
    console.log(error.message);
  }
}

async function getComments() {
  try {
    const res2 = await fetch(`http://localhost:3030/jsonstore/blog/posts`);
    const postsData = await res2.json();

    const postTitle = Array.from(select.options)
      .find((x) => x.value === select.value);
 
    const bodyTitle = Object.values(postsData)
      .find((obj) => obj.title === postTitle.textContent);

    title.textContent = postTitle.textContent;
    body.textContent = bodyTitle.body;

    const res = await fetch('http://localhost:3030/jsonstore/blog/comments');
    const commentsData = await res.json();

    postComments.innerHTML = '';

    for (const obj of Object.values(commentsData)) {
      if (obj.postId == select.value) {
        loadComments(obj);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
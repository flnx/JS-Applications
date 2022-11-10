export function createPostPreview(post) {
  const divContainer = document.createElement('div');
  divContainer.className = 'topic-container';
  divContainer.dataset.id = post._id;

  divContainer.innerHTML = `
  <div class="topic-name-wrapper">
   <div class="topic-name">
   <a href="#" class="normal">
     <h2>${post.title}</h2>
   </a>
   <div class="columns">
     <div>
       <p>Date: <time>${post.date}</time></p>
       <div class="nick-name">
         <p>Username: <span>${post.username}</span></p>
       </div>
     </div>
    </div>
   </div>
  </div>
  `;
  return divContainer;
}

export function createCommentsPreview(comment) {
  const divContainer = document.createElement('div');
  divContainer.classList.add('topic-name-wrapper');

  divContainer.innerHTML =   
  `<div class="topic-name">
   <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time></p>
    <div class="post-content">
      <p>${comment.postText}</p>
  </div>
</div>
`
return divContainer;
}
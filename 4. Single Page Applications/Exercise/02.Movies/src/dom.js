export function createElement(data) {
  const li = document.createElement('li');
  li.className = 'card mb-4';

  li.innerHTML = `
  <img class="card-img-top" src="${data.img}" alt="Card image cap" width="400">
  <div class="card-body">
    <h4 class="card-title">${data.title}</h4>
  </div>
  <div class="card-footer">
    <a href="#/details/6lOxMFSMkML09wux6sAF">
    <button type="button" class="btn btn-info" data-owner-id="${data._ownerId}" data-id="${data._id}" data-btn-type="onDetails">Details</button>
    </a>
  </div>
  `;
  return li;
}

export function createDetailsPreview(movie, permissions, totalLikes, isLikedByUser) {
  const section = document.createElement('section');
  section.id = 'movie-example';
  section.className = 'view-section';
  section.dataset.id = movie._ownerId;

  section.innerHTML = `
   <div class="container">
    <div class="row bg-light text-dark">
     <h1>Movie title: ${movie.title}</h1>
     <div class="col-md-8">
       <img class="img-thumbnail" src="${movie.img}"
         alt="Movie" />
     </div>
     <div class="col-md-4 text-center">
       <h3 class="my-3">Movie Description</h3>
       <p>${movie.description}</p>
     </div>
   </div>
 </div>
  `;

  const selector = section.querySelector('.col-md-4');

  if (permissions == 'user is not logged') {
    selector.innerHTML += `<span class="enrolled-span" data-id="${movie._id}">Liked ${totalLikes}</span>`
  } else if (permissions == 'bazinga!') {
    selector.innerHTML += `
    <a class="btn btn-danger" data-btn-type="onDelete" data-id="${movie._id}" href="#">Delete</a>
    <a class="btn btn-warning" data-btn-type="editPage" data-id="${movie._id}" href="#">Edit</a>
    <span class="enrolled-span" data-id="${movie._id}">Liked ${totalLikes}</span>
    `;
  } else {
    selector.innerHTML += `<a class="btn btn-primary" data-btn-type="onLike" data-id="${movie._id}"" href="#">Like</a>`;
    
    if (isLikedByUser.length > 0) {
      let btn = selector.querySelector('a');
      btn.classList.add('enrolled-span');
      btn.classList.remove('btn', 'btn-primary');
      btn.innerText = `Liked ${totalLikes}`;
    }
  }
  return section;
}
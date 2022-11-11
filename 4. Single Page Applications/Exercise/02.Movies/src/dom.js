export function createElement(data) {
  const li = document.createElement('li');
  li.className = 'card mb-4';
  li.dataset.id = data._ownerId;

  li.innerHTML = `
  <img class="card-img-top" src="${data.img}" alt="Card image cap" width="400">
  <div class="card-body">
    <h4 class="card-title">${data.title}</h4>
  </div>
  <div class="card-footer">
    <a href="#/details/6lOxMFSMkML09wux6sAF">
    <button type="button" class="btn btn-info" data-id="${data._id}">Details</button>
    </a>
  </div>
  `;
  return li;
}



/* <section id="movie-example" class="view-section">
        <div class="container">
          <div class="row bg-light text-dark">
            <h1>Movie title: Black Widow</h1>

            <div class="col-md-8">
              <img
                class="img-thumbnail"
                src="https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg"
                alt="Movie"
              />
            </div>
            <div class="col-md-4 text-center">
              <h3 class="my-3">Movie Description</h3>
              <p>
                Natasha Romanoff aka Black Widow confronts the darker parts of
                her ledger when a dangerous conspiracy with ties to her past
                arises. Comes on the screens 2020.
              </p>
              <a class="btn btn-danger" href="#">Delete</a>
              <a class="btn btn-warning" href="#">Edit</a>
              <a class="btn btn-primary" href="#">Like</a>
              <span class="enrolled-span">Liked 1</span>
            </div>
          </div>
        </div>
      </section> */




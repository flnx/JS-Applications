const section = document.querySelector('.theme-content').parentElement
section.remove();

export function showDetails(e) {
  let target = e.target;

  if (target.tagName == 'H2') {
    target = target.parentElement;
  }

  if (target.tagName == 'A') {
    e.preventDefault();
    showPost();
  }

  function showPost(postId) {
    document.getElementById('main').replaceChildren(section);
  }

}

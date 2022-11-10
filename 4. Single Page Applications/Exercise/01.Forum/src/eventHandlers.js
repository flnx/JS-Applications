import { showPost } from './details.js';
import { onCancel, onPost, showHome } from './home.js';

document.querySelector('.topic-title').addEventListener('click', postDetailsHandler);
document.querySelector('.cancel').addEventListener('click', onCancel)
document.querySelector('.public').addEventListener('click', onPost)


export function postDetailsHandler(e) {
  e.preventDefault();
  let target = e.target;

  if (target.tagName == 'H2') {
    target = target.parentElement;
  }

  if (target.tagName == 'A') {
    const postId = target.parentElement.parentElement.parentElement;
    showPost(postId);
  }
}

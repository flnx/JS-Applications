const notification = document.querySelector('.notification');

export const notify = (message) => {
  notification.querySelector('span').textContent = message;
  notification.style.display = "block";
  
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

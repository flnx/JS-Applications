const section = document.getElementById('homeView');

let context = null;

export async function showHome(ctx) {
  context = ctx;
  ctx.showSection(section);
}

section.querySelector('.btn').addEventListener('click', (e) => {
  e.preventDefault();

  context.goTo('/register');
});
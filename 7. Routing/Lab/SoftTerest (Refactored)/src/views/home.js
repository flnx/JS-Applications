const section = document.getElementById('homeView');

export async function showHome(ctx) {
  ctx.render(section);
}
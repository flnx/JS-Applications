const container = document.getElementById('container');

export function refreshPage() {
  [...container.children].slice(1, -1).map((x) => x.remove());
}

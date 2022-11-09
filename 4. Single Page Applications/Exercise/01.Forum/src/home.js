import { showDetails } from "./details.js";
const section = document.querySelector('main');

section.querySelector('.topic-title').addEventListener('click', showDetails);
section.remove(section);

export function showHome() {
  document.getElementById('main').replaceChildren(section);
}

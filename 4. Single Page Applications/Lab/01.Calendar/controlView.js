import { showSelectedYear, goBack } from './yearsNavigation.js';
import { showSelectedMonth } from './monthsNavigation.js';

export function resetView() {
  document.querySelectorAll('.monthCalendar').forEach((x) => (x.style.display = 'none'));
  document.querySelectorAll('.daysCalendar').forEach((x) => (x.style.display = 'none'));
}

export function attachEvents() {
  document.body.addEventListener('click', viewController);
}

function viewController(e) {
  const target = e.target.innerText;
  const idElem = e.target.closest('section').id;

  if (!target || target.length < 3 || target.includes('-')) {
    return;
  }

  if (idElem == 'years' && target.startsWith('202') && target.length == 4) {
    showSelectedYear(target);
    document.getElementById('years').style.display = 'none';
    return;
  } else if (e.target.tagName == 'CAPTION' && target.length < 15) {
    goBack(e);
    return;
  } else if (target.length <= 4) {
    showSelectedMonth(e, target);
  }
}
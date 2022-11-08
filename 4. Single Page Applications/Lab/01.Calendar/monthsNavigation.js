const months = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sept: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export function showSelectedMonth(e, selectedMonth) {
  const section = e.target.closest('section');
  const yearId = section.id.slice(-4);
  const id = months[selectedMonth];

  const month = document.getElementById(`month-${yearId}-${id}`);
  month.style.display = 'block';
  section.style.display = 'none';
}
export function showSelectedYear(id) {
  const year = document.getElementById(`year-${id}`);
  
  if (year.style.display == 'none') {
    year.style.display = 'block';
  } else {
    year.style.display = 'none';
    document.getElementById('years').style.display = 'block';
  }
}

export function showSelectedMonth(e) {
  const id = e.target.closest('section').id;
  const year = id.substring(6, 10);

  showSelectedYear(year);
  document.getElementById(id).style.display = 'none'
}

export function goBack(e) {
  const target = e.target.innerText;

  if (target.length == 4) {
    showSelectedYear(target);
    return;
  }

  showSelectedMonth(e);
}
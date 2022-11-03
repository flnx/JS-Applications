function solve() {
  const next = document.getElementsByClassName('info')[0];
  const departBtn = document.getElementById('depart');
  const arriveBtn = document.getElementById('arrive');
  let stop = {
    next: 'depot',
  };

  function depart() {
    departBtn.disabled = true;
    arriveBtn.disabled = false;
    const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        stop = Object.assign({}, data);
        next.textContent = `Next stop ${stop.name}`;
      })
      .catch(err => console.log(err)) 
  }

  function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;
    next.textContent = `Arriving at ${stop.name}`;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();

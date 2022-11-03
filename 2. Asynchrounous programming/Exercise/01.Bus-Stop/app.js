function getInfo() {
  const stopId = document.getElementById('stopId');
  const stopNameElem = document.getElementById('stopName');
  const ulBuses = document.getElementById('buses');
  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId.value}`;

  fetch(url)
    .then((res) => res.json())
    .then(displayBusInfo)
    .catch((err) => {
      ulBuses.innerHTML = '';
      stopNameElem.textContent = 'Error';
    });

  function displayBusInfo(data) {
    const buses = data.buses;
    stopNameElem.textContent = data.name;
    ulBuses.innerHTML = '';

    Object.keys(buses).forEach((bus) => {
      const li = document.createElement('li');
      li.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
      ulBuses.appendChild(li);
    });
  }
}
function attachEvents() {
  const weatherBtn = document.getElementById('submit');
  const userLocation = document.getElementById('location');
  const forecastElem = document.getElementById('forecast');
  const currentElem = document.getElementById('current');
  const upcomingElem = document.getElementById('upcoming');
  weatherBtn.addEventListener('click', executor);

  const symbols = {
    Sunny: '&#x2600;',
    'Partly sunny': '&#x26C5;',
    Overcast: '&#x2601;',
    Rain: '&#x2614;',
    degrees: '&#176;',
  };

  async function executor() {
    const weatherResultArr = await weatherRequestHandler();

    if (!weatherResultArr) {
      return;
    }

    generateHtml(weatherResultArr);
  }

  async function getCurrentConditions(city) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${city.code}`;
    const res = await fetch(url);
    const condition = await res.json();

    return condition;
  }

  async function getThreeDayForecast(city) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${city.code}`;
    const res = await fetch(url);
    const forecast = await res.json();

    return forecast;
  }

  async function weatherRequestHandler() {
    try {
      if (userLocation.value == '') {
        throw new Error('Fields must not be empty');
      }

      const url = 'http://localhost:3030/jsonstore/forecaster/locations';
      const res = await fetch(url);

      if (res.ok == false) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const findCity = data.find((x) => x.name == userLocation.value);

      if (!findCity) {
        throw new Error('The city does not exist in our database');
      }
      const conditions = await getCurrentConditions(findCity);
      const forecast = await getThreeDayForecast(findCity);

      return [conditions, forecast];
    } catch (err) {
      console.log(err);
    }
  }

  function generateHtml(weatherResultArr) {
    const [current, nextDays] = weatherResultArr;
    // current weather
    const cityName = current.name;
    const { condition, high, low } = current.forecast;
    const d = symbols.degrees;

    const div = createElement('div', 'forecasts');
    const spanSymbol = createElement('span', 'condition', '', symbols[condition]);
    const spanWrapper = createElement('span', 'condition');
    const spanCity = createElement('span', 'forecast-data', cityName);
    const spanDeg = createElement('span', 'forecast-data', '', `${low}${d}/${high}${d}`);
    const spanCondition = createElement('span', 'forecast-data', condition);
    spanSymbol.classList.add('symbol');
    append(spanWrapper, spanCity, spanDeg, spanCondition);
    append(div, spanSymbol, spanWrapper);

     // upcoming weather
    const div2 = createElement('div', 'forecast-info');

    nextDays.forecast.forEach(x => {
      const spanWrapper2 = createElement('span', 'upcoming');
      const spanSymbol2 = createElement('span', 'symbol', '', symbols[x.condition]);
      const spanDeg2 = createElement('span', 'forecast-data', '', `${x.low}${d}/${x.high}${d}`);
      const spanCondition2 = createElement('span', 'forecast-data', x.condition);
      append(spanWrapper2, spanSymbol2, spanDeg2, spanCondition2);
      append(div2, spanWrapper2);

    });

    // clear previous html elements
     const clearCurrent = Array.from(currentElem.children);
     const clearUpcoming = Array.from(upcomingElem.children);
     
     clearCurrent.slice(0, 1).forEach((x) => x.remove());
     clearUpcoming.slice(0, 1).forEach((x) => x.remove());

    // append everything to the page
    currentElem.appendChild(div);
    upcomingElem.appendChild(div2);
    forecastElem.style.display = 'block';

    function createElement(type, className, content, weatherSymbol) {
      const element = document.createElement(type);
      element.classList.add(className);

      if (content) {
        element.textContent = content;
      }

      if (weatherSymbol) {
        element.innerHTML = weatherSymbol;
      }

      return element;
    }

    function append(parent, ...elements) {
      elements.map((el) => parent.appendChild(el));
    }
  }
}
attachEvents();
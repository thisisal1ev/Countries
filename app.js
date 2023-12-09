const elDarkModeBtn = document.querySelector('.js-darkmodeBtn');
const elList = document.querySelector('.country-list');
const elSearch = document.querySelector('.js-input');
const elSelect = document.querySelector('.js-select');
const loader = document.querySelector('#loader')

elDarkModeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
});

const getCounties = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  data.map((country) => {

    const li = document.createElement('li');
    li.classList.add('country-list-item', 'js-list-item');
    elList.appendChild(li);

    const img = document.createElement('img');
    img.classList.add('country-flag');
    img.src = country.flags.png;
    img.alt = country.flags.common;
    li.appendChild(img);

    const div = document.createElement('div');
    div.classList.add('info-wrapper');
    li.appendChild(div);

    const h3 = document.createElement('h3');
    h3.classList.add('info-title');
    h3.textContent = country.name.common
    div.appendChild(h3);

    const population = document.createElement('p');
    population.classList.add('country-info');
    population.textContent = country.population
    div.appendChild(population);

    const boldPop = document.createElement('b');
    boldPop.textContent = 'Population : '
    population.prepend(boldPop);

    const region = document.createElement('p');
    region.classList.add('country-info', 'js-region');
    region.textContent = country.region
    div.appendChild(region);

    const boldReg = document.createElement('b');
    boldReg.textContent = 'Region : '
    region.prepend(boldReg);

    const capital = document.createElement('p');
    capital.classList.add('country-info');
    capital.textContent = country.capital
    div.appendChild(capital);

    const boldCap = document.createElement('b');
    boldCap.textContent = 'Capital : '
    capital.prepend(boldCap);

  });
  loader.style.display = 'none';
};

getCounties();

elSearch.addEventListener('keyup', () => {
  const searchText = elSearch.value.toLowerCase();
  const titles = document.querySelectorAll('.info-title');
  const cards = document.querySelectorAll('.js-list-item');

  titles.forEach((title, index) => {
    if (title.textContent.toLowerCase().includes(searchText)) {
      cards[index].style.display = 'block'
    } else {
      cards[index].style.display = 'none'
    }
  });
});

elSelect.addEventListener('change', () => {
  const selectedRegion = elSelect.value.toLocaleLowerCase();
  const regions = document.querySelectorAll('.js-region');
  const cards = document.querySelectorAll('.js-list-item');

  regions.forEach((region, index) => {
    if (region.textContent.toLowerCase().includes(selectedRegion)) {
      cards[index].style.display = 'block';
    } else {
      cards[index].style.display = 'none';
    }
  });
});
import './css/styles.css';

import cardCountryItemTmp from './templates/cardCountryItemTmp.hbs';
import cardCountryTmp from './templates/cardCountryTmp.hbs';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import CountriesApiService from './js/CountriesApi.js';

const countriesApiService = new CountriesApiService();

const refs = {
    inputEl:document.querySelector('#search-box'),
    listContainer:document.querySelector('.country-list'),
    cardContainer:document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY,
  {leading: true,
    trailing: false}
    ));



function onSearch(e){
  const data = e.currentTarget.value;
  if (data !== '' || data !== ' '){
  countriesApiService.query = data.trim();
  //console.log(data.trim());
  countriesApiService.fetchCountries().then(renderCountryCard).catch(error => console.log(error))
  }
};


 function renderCountryCard(countries){
  let markup = [];
  if (countries.length >= 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    refs.listContainer.innerHTML = " ";
    refs.cardContainer.innerHTML = " ";
   }
  else if (countries.length <= 10 && countries.length >= 2){
    for(let i=0; i<countries.length; i++){
      markup.push(cardCountryItemTmp(countries[i]));
    }
    refs.cardContainer.innerHTML = " ";
    refs.listContainer.innerHTML = markup.join(" ");
  }
  else if (countries.length === 1){
    refs.listContainer.innerHTML = " ";
    refs.cardContainer.innerHTML = cardCountryTmp(countries[0]);
  }
  else if (countries.length === 0){
    refs.listContainer.innerHTML = " ";
    refs.cardContainer.innerHTML = " ";
  }
  else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    refs.listContainer.innerHTML = " ";
    refs.cardContainer.innerHTML = " ";
  }

 }
export default class CountriesApiService{
  constructor() {
    this.searchQuery = ' '
  }
    fetchCountries(){
      const url = `https://restcountries.com/v2/name/${this.searchQuery}?fields=name,country,capital,population,flags,languages`
        
     return fetch(url)
      .then (response =>
          response.json())
          .then(countries => {
            return countries;
          });
      }
  get query(){
    return this.searchQuery
  }

  set query(newQuery){
    this.searchQuery = newQuery
  }

}
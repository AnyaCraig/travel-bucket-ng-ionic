const { RESTDataSource } = require('apollo-datasource-rest');

class CountryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/';
  }

  async getAllCountries() {
    const response = await this.get('all', undefined, {
      headers: {
        'x-rapidapi-key': "4ecb9f5970msh2da0ee970935560p1e118fjsnb6a91812c589",
        'x-rapidapi-host': "ajayakv-rest-countries-v1.p.rapidapi.com"
      },
    });
    return Array.isArray(response)
      ? response.map(country => this.countryReducer(country))
      : [];
  }

  countryReducer(country) {
    return {
      name: country.name,
      cursor: `${country.name}`,
      population: country.population,
      isInBucket: false,
      area: country.area,
      capital: country.capital,
      demonym: country.demonym,
      languages: country.languages,
      latlng: country.latlng,
      region: country.region ? country.region : "regionless",
      subregion: country.subregion,
      gini: country.gini
    };
  }
}

module.exports = CountryAPI;

const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    placesData: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allCountries = await dataSources.countryAPI.getAllCountries();

      const countries = paginateResults({
        after,
        pageSize,
        results: allCountries
      });
      return {
        countries,
        cursor: countries.length ? countries[countries.length - 1].cursor : null,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: countries.length
          ? countries[countries.length - 1].cursor !==
            allCountries[allCountries.length - 1].cursor
          : false
      };
    }
  }
};

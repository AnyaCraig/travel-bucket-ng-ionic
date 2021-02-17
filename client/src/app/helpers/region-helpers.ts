

export const getRegionsFromCountries = (countriesList) => {
  console.log("COUNTRIES LIST", countriesList);
  const regionsList = countriesList.map((country) => {
    if (!country.region) {
      console.log("NO REGION HERE", country);
    }
    return country.region ? country.region.toLowerCase() : "Regionless countries";
  });

  console.log("regions array", [...new Set(regionsList)]);

  return [...new Set(regionsList)];
}

export const getRegionFilters = (newCountriesList, oldCountriesList, regionFilters) => {
  const regionsArray = getRegionsFromCountries([...newCountriesList, ...oldCountriesList]);
  const newRegionFilters = {};

  console.log("REGIONS ARRAY", regionsArray);

  regionsArray.forEach((region: string) => {

    if (regionFilters[region]) {
      newRegionFilters[region] = regionFilters[region];
    } else {
      newRegionFilters[region] = false;
    }

  })

  return newRegionFilters;
}

export const sortRegionFilterObjects = (a, b) => {
  if (a.regionName < b.regionName) return -1;
  if (a.regionName > b.regionName) return 1;
  return 0;
}
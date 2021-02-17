import { createSelector } from "@ngrx/store";
import { sortRegionFilterObjects } from "../helpers/region-helpers";

export const selectPlaces = (state) => state.places;

export const selectAllCountries = createSelector(
  selectPlaces,
  (state) => state.countries
);

export const selectFilteredCountries = createSelector(
  selectPlaces,
  (state) => state.countries.filter(country => Object.keys(state.regionFilters).every(val => !state.regionFilters[val]) || state.regionFilters[country.region.toLowerCase()])
);


export const selectBucketListCountries = createSelector(
  selectAllCountries,
  (state) => state.filter(country => country.isInBucket)
);

export const isFetchingCountries = createSelector(
  selectPlaces, 
  (state) => state.isFetchingCountries
);

export const errorFetchingCountries = createSelector(
  selectPlaces,
  (state) => state.errorFetchingCountries
);

export const hasMoreCountries = createSelector(
  selectPlaces,
  (state) => state.hasMoreCountries
);

export const countryCursor = createSelector(
  selectPlaces,
  (state) => state.countryCursor
);

export const regionFilters = createSelector(
  selectPlaces,
  (state) => Object.entries(state.regionFilters).map((entry) => ({regionName: entry[0], isChecked: entry[1]})).sort(sortRegionFilterObjects)
);
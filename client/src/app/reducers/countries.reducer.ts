import { createReducer, on} from '@ngrx/store';
import {
  addCountriesToStore, 
  addCountryToBucket, 
  fetchCountries, 
  removeCountryFromBucket, 
  countryFetchingError, 
  toggleRegionFilter
} from '../actions/countries.actions';
import { getRegionFilters } from '../helpers/region-helpers';
import { regionFilters } from '../selectors/countries.selectors';
 
export const initialState = {
  countries: [],
  regionFilters: {},
  hasMoreCountries: true,
  countryCursor: null,
  isFetchingCountries: false,
  errorFetchingCountries: false
};

const _countryReducer = createReducer(
  initialState,
  on(fetchCountries, (state) => {
    return {
      ...state,
      isFetchingCountries: true,
      errorFetchingCountries: false
    }
  }),
  on(countryFetchingError, (state) => {
    return {
      ...state,
      errorFetchingCountries: true,
      isFetchingCountries: false
    }
  }),
  on(addCountriesToStore, (state, { payload }) => {
    console.log("PAYLOAD IN REDUCER", payload);
    return { 
      ...state, 
      countries: [...state.countries, ...payload.list],
      regionFilters: getRegionFilters(payload.list, state.countries, state.regionFilters),
      hasMoreCountries: payload.hasMore,
      countryCursor: payload.cursor,
      isFetchingCountries: false,
      errorFetchingCountries: false
    }
  }),
  on(addCountryToBucket, (state, { payload }) =>  ({ 
    ...state, countries: state.countries.map(country => {
      if (country.name === payload) {
        return {
          ...country,
          isInBucket: true
        }
      } else {
        return country;
      }
    })
  })),
  on(removeCountryFromBucket, (state, { payload }) => ({ 
    ...state, countries: state.countries.map(country => {
      if (country.name === payload) {
        return {
          ...country,
          isInBucket: false
        }
      } else {
        return country;
      }
    })
  })),

  on(toggleRegionFilter, (state, {payload}) => {
    console.log("PAYLOAD TOGGLE", payload);
    return {
    ...state,
    regionFilters: {
      ...state.regionFilters,
      [payload]: !state.regionFilters[payload]
    }

  }

  })
);

export function countryReducer(state, action) {
  return _countryReducer(state, action);
}
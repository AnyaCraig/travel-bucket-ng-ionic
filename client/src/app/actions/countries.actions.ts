import { createAction, props } from '@ngrx/store';
import { Place } from '../types/place.interface';
import { CountryActionTypes } from './constants';

export const fetchCountries = createAction(CountryActionTypes.FETCH_COUNTRIES,
  props<{cursor: string}>()
  );

export const fetchMoreCountries = createAction(CountryActionTypes.FETCH_MORE_COUNTRIES,
  props<{ payload: string }>()
  );

export const toggleRegionFilter = createAction(CountryActionTypes.TOGGLE_REGION_FILTER,
  props<{payload: string}>()
  );

export const countryFetchingError = createAction(CountryActionTypes.ERROR_FETCHING_COUNTRIES);

export const addCountriesToStore = createAction(
  CountryActionTypes.ADD_COUNTRIES_TO_STORE,
  props<{ payload: { list: Place[], hasMore: boolean, cursor: string }}>()
  );
export const addCountryToBucket = createAction(
  CountryActionTypes.ADD_COUNTRY_TO_BUCKET,
  props<{ payload: string }>()
  );
export const removeCountryFromBucket = createAction(
  CountryActionTypes.REMOVE_COUNTRY_FROM_BUCKET,
  props<{ payload: string }>()
  );

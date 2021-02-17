import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, delay, withLatestFrom, switchMap } from 'rxjs/operators';
import { CountryActionTypes } from '../actions/constants';
// import { RestService } from '../services/rest.service';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import { Store } from '@ngrx/store';
import { countryCursor } from '../selectors/countries.selectors';


export const COUNTRY_TILE_DATA = gql`
  fragment CountryTile on Country {
    __typename
    name
    population
    isInBucket
    area
    capital
    demonym
    languages
    latlng
    region
    subregion
    gini
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountryList($after: String) {
    placesData(after: $after) {
      cursor
      hasMore
      countries {
        ...CountryTile
      }
    }
  }
  ${COUNTRY_TILE_DATA}
`;

@Injectable()
export class PlaceEffects {

  countryQuery: QueryRef<any>;
  
  loadPlaces$ = createEffect(() => this.actions$.pipe(
    ofType(CountryActionTypes.FETCH_COUNTRIES),

    // withLatestFrom(this.store$.select(countryCursor)),
    // mergeMap(() => this.restService.getCountries() -  UNUSED SINCE THE SWITCH TO GRAPHQL
    mergeMap((action: any) => this.apollo
    .watchQuery<any>({
      query: GET_COUNTRIES,
      variables: {
        pageSize: undefined,
        after: action.cursor
      }
    })
    .valueChanges
      .pipe(
        delay(1000),
        map(results => {
          console.log("WE GOT COUNTRIES HERE~")
          const countries = results.data.placesData.countries;
          return ({ type: CountryActionTypes.ADD_COUNTRIES_TO_STORE, payload: {
            list: countries,
            hasMore: results.data.placesData.hasMore,
            cursor: results.data.placesData.cursor
          }});
        }),
        catchError(() => of({type: CountryActionTypes.ERROR_FETCHING_COUNTRIES})),
      ))
    )
  );


  constructor(
    private actions$: Actions,
    private apollo: Apollo,
    private store$: Store,
  ) {}
}

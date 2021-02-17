import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Place } from '../types/place.interface';

const endpoint = 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'x-rapidapi-key': "4ecb9f5970msh2da0ee970935560p1e118fjsnb6a91812c589",
    'x-rapidapi-host': "ajayakv-rest-countries-v1.p.rapidapi.com"
  });

  private extractData(res: Response): any {
    console.log("RESULTS!", res);
    const body = res;
    return body || { };
  }

  private transformPlace(place: any): Place {
    return {
      name: place.name,
      population: place.population,
      isInBucket: false,
      area: place.area,
      capital: place.capital,
      demonym: place.demonym,
      languages: place.languages,
      latlng: place.latlng,
      region: place.region,
      subregion: place.subregion,
      gini: place.gini
    };
  }

  getCountries(): Observable<any> {
    return this.http.get(endpoint, { headers: this.headers }).pipe(
      delay(800),
      map(this.extractData),
      map((array: any[]) => {
        return array.map((place) => this.transformPlace(place))
      },
      catchError(this.handleError)
    ));
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

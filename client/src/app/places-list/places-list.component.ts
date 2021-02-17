import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/types/place.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchCountries, fetchMoreCountries} from 'src/app/actions/countries.actions';
import { RestService} from '../services/rest.service';
import { countryCursor, errorFetchingCountries, hasMoreCountries, isFetchingCountries, selectFilteredCountries } from '../selectors/countries.selectors';


@Component({
  selector: 'places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.scss'],
})
export class PlacesListComponent implements OnInit {
  placesList$: Observable<Place[]>;
  isFetching$: Observable<boolean>;
  errorFetching$: Observable<boolean>;
  hasMoreCountries$: Observable<boolean>;
  countryCursor$: Observable<boolean>;

  constructor(public rest: RestService, private store: Store<any>) { 
    this.placesList$ = this.store.select(selectFilteredCountries);
    this.isFetching$ = this.store.select(isFetchingCountries);
    this.errorFetching$ = this.store.select(errorFetchingCountries)
    this.hasMoreCountries$ = this.store.select(hasMoreCountries)
    this.countryCursor$ = this.store.select(countryCursor)
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(cursor?: string): void {
    this.store.dispatch(fetchCountries({ cursor }))
  }
}

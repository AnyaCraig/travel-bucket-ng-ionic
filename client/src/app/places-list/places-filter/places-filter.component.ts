import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place} from 'src/app/types/place.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addCountryToBucket, removeCountryFromBucket, toggleRegionFilter } from 'src/app/actions/countries.actions';
import { regionFilters } from 'src/app/selectors/countries.selectors';
import { RegionCheckboxFilter } from 'src/app/types/regionFilter.interface';

@Component({
  selector: 'places-filter',
  templateUrl: './places-filter.component.html',
  styleUrls: ['./places-filter.component.scss'],
})
export class PlacesFilterComponent implements OnInit {
  // @Input() place: Place;
  regionFilters$: Observable<{regionName: string; isChecked: unknown}[]>;

  constructor(private store: Store<any>) { 
    this.regionFilters$ = this.store.select(regionFilters);
  }

  handleCheckboxClick(checkboxName) {
    console.log("WE ARE CLICKING THE CHECKBOX", checkboxName);
    this.store.dispatch(toggleRegionFilter({ payload: checkboxName }));
  }
  



  ngOnInit() {

    this.regionFilters$.subscribe(data => console.log("DATA",data))
  }
}

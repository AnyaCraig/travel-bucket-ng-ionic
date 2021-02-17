import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from 'src/app/types/place.interface';
import { Store } from '@ngrx/store';
import { selectBucketListCountries } from '../selectors/countries.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.scss'],
})
export class BucketListComponent implements OnInit {

  bucketList$: Observable<Place[]>;

  constructor(private store: Store<any>) { 
    this.bucketList$ = this.store.select(selectBucketListCountries);
  }
  ngOnInit() {
  }

}

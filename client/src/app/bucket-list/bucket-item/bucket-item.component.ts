import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeCountryFromBucket } from 'src/app/actions/countries.actions';
import { Place } from 'src/app/types/place.interface';

@Component({
  selector: 'bucket-item',
  templateUrl: './bucket-item.component.html',
  styleUrls: ['./bucket-item.component.scss'],
})
export class BucketItemComponent implements OnInit {

  @Input() place: Place;

  constructor(private store: Store<any>) { }

  removeFromBucketList() {
    this.store.dispatch(removeCountryFromBucket({ payload: this.place.name }));
  }

  ngOnInit() {

    console.log("BUCKET ITEM", this.place.name)
  }



}

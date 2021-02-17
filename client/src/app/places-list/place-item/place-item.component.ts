import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from 'src/app/types/place.interface';
import { Store } from '@ngrx/store';
import { addCountryToBucket, removeCountryFromBucket } from 'src/app/actions/countries.actions';

@Component({
  selector: 'place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.scss'],
})
export class PlaceItemComponent implements OnInit {
  @Input() place: Place;

  constructor(private store: Store<any>) { }
  
  handleAddOrRemoveClick() {
    console.log("ADD OR REMOVE CLICK");
    return this.place.isInBucket ? this.removeFromBucket() : this.addToBucket();
  }

  addToBucket() {
    console.log(`YOU ARE GOING TO ADD ${this.place.name} to your bucket`);
    this.store.dispatch(addCountryToBucket({ payload: this.place.name }));
  }

  removeFromBucket() {
    console.log(`YOU ARE GOING TO REMOVE ${this.place.name} from your bucket`);
    this.store.dispatch(removeCountryFromBucket({ payload: this.place.name }));
  }

  ngOnInit() {}
}

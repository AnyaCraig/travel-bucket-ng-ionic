import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesListComponent } from './places-list.component';
import { PlaceItemComponent } from './place-item/place-item.component';
import { PlacesFilterComponent } from './places-filter/places-filter.component';
import { AccordionModule } from '../accordion/accordion.module';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, AccordionModule],
  declarations: [PlacesListComponent, PlaceItemComponent, PlacesFilterComponent],
  exports: [PlacesListComponent]
})
export class PlacesListModule {}

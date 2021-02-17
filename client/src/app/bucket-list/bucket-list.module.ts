import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucketListComponent } from './bucket-list.component';
import { BucketItemComponent } from './bucket-item/bucket-item.component';

@NgModule({
  imports: [ CommonModule, IonicModule],
  declarations: [BucketListComponent, BucketItemComponent],
  exports: [BucketListComponent]
})
export class BucketListModule {}

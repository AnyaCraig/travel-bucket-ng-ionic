import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AccordionComponent],
  exports: [AccordionComponent]
})
export class AccordionModule {}

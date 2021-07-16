import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() { }

  options = {
    cssClass: 'ion-select-custom-interface',
    header: 'Choose a location'
  };

  description: string = "<h1>My Header</h1> more text <br> and a break"

}

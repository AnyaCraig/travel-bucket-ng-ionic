import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  @Input() accordionTitle: string;
  isOpen: boolean = false;

  constructor() {}
  ngOnInit() {}

  toggleOpenState() {
    this.isOpen = !this.isOpen;
  }

}

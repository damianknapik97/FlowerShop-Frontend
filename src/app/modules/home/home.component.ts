import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.sass'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [animate(3000)]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

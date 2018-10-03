import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition , state} from '@angular/animations';

@Component({
  selector: 'app-slides-container',
  templateUrl: './slides-container.component.html',
  styleUrls: ['./slides-container.component.css'],
  animations: [
    trigger('slideContainer', [
      state('true', style({
        'background-color': '#F4F3EF',
        transform: 'translateY(0)'
      })),
      state('false', style({
        'background-color': 'orange',
        transform: 'translateY(100px)'
      })),
      transition('0 <=> 1', animate(1000)),
    ])
  ]
})
export class SlidesContainerComponent implements OnInit {
  @Input() isVisible:boolean = false;
  ngOnInit() {
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { SlideAnnotationsComponent } from 'src/app/slide-annotations/slide-annotations.component';

@Component({
  selector: 'app-slides-container',
  templateUrl: './slides-container.component.html',
  styleUrls: ['./slides-container.component.css'],
  animations: [
    trigger('slideContainer', [
      state('true', style({
        transform: 'translateY(0)'
      })),
      state('false', style({
        transform: 'translateY(150px)'
      })),
      transition('0 <=> 1', animate(100)),
    ])
  ]
})

export class SlidesContainerComponent implements OnInit {
  @Input() slideAnnotations: SlideAnnotationsComponent;
  @Input() opened = false;

  ngOnInit() {
  }

  toggleBottomDrawer() {
    this.opened = !this.opened;
  }
}

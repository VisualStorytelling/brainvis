import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition , state} from '@angular/animations';
import { ProvenanceService } from 'src/app/provenance.service';
import {SlidesContainerComponent} from '../slides-container/slides-container.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('menu', [
      state('true', style({
        'opacity': '1',
        transform: 'translateY(50px)'
      })),
      state('false', style({
        'opacity': '0',
        transform: 'translateY(0)',
      })),
      transition('0 <=> 1', animate(1000)),
    ])
  ]
})
export class SidenavComponent implements OnInit {
  showSlideContainer: boolean = false;
  showMenuContainer: boolean = false;
  constructor(private provenance: ProvenanceService) { }
 
  ngOnInit() {
  }
  showSlides() {
    this.showSlideContainer = !this.showSlideContainer;
  }
  showMenu() {
    this.showMenuContainer = !this.showMenuContainer;
  }
}

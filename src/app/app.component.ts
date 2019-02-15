import { Component, OnInit } from '@angular/core';
import { ProvenanceService } from './provenance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private bottomDrawerOpen  = true;

  constructor(public provenance: ProvenanceService) {
    // console.log(arg);
    console.log('constructor');
  }
  ngOnInit() {
    console.log('init?');
  }
  toggleBottomDrawer() {
    this.bottomDrawerOpen = !this.bottomDrawerOpen;
  }
}

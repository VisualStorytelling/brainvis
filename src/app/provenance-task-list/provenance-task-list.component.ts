import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ProvenanceService } from '../provenance.service';
import { ProvenanceTaskList } from '@visualstorytelling/provenance-task-list';
import { ProvenanceSlide, ProvenanceSlidedeck } from '@visualstorytelling/provenance-core';
@Component({
  selector: 'app-provenance-task-list',
  template: '',
  styleUrls: ['./provenance-task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvenanceTaskListComponent implements OnInit {
  private _deck: ProvenanceSlidedeck;
  private _taskList: ProvenanceTaskList;
  constructor(
    private elementRef: ElementRef,
    private provenance: ProvenanceService
  ) { }
  get deck() {
    return this._deck;
  }
  ngOnInit() {
    this._deck = new ProvenanceSlidedeck(this.provenance.graph.application, this.provenance.traverser);
    this._taskList = new ProvenanceTaskList(
      this._deck,
      this.provenance.graph,
      this.elementRef.nativeElement
    );
  }
}

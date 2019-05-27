import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ProvenanceService } from '../provenance.service';
import { ProvenanceTaskList } from '@visualstorytelling/provenance-task-list';
import { ProvenanceSlidedeck } from '@visualstorytelling/provenance-core';

@Component({
  selector: 'app-provenance-task-list',
  template: '',
  styleUrls: ['./provenance-task-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProvenanceTaskListComponent implements OnInit {
  private _taskList: ProvenanceTaskList;
  constructor(
    private elementRef: ElementRef,
    private provenance: ProvenanceService
  ) {}

  ngOnInit() {
    this._taskList = new ProvenanceTaskList(
      new ProvenanceSlidedeck(this.provenance.graph.application, this.provenance.traverser),
      this.provenance.graph,
      this.elementRef.nativeElement
    );
  }
}

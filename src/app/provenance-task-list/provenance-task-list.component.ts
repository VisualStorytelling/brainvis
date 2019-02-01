import { Component, ElementRef, OnInit } from '@angular/core';
import { ProvenanceService } from '../provenance.service';
import { ProvenanceTaskList } from '@visualstorytelling/provenance-task-list';

@Component({
  selector: 'app-provenance-task-list',
  template: '<div></div>',
  styleUrls: ['./provenance-task-list.component.css']
})
export class ProvenanceTaskListComponent implements OnInit {
  private _taskList: ProvenanceTaskList;
  constructor(
    private elementRef: ElementRef,
    private provenance: ProvenanceService
  ) {}

  ngOnInit() {
    this._taskList = new ProvenanceTaskList(
      this.provenance.graph,
      this.elementRef.nativeElement
    );
  }
}

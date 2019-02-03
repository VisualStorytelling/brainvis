import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvenanceTaskListComponent } from './provenance-task-list.component';

describe('ProvenanceTaskListComponent', () => {
  let component: ProvenanceTaskListComponent;
  let fixture: ComponentFixture<ProvenanceTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvenanceTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvenanceTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

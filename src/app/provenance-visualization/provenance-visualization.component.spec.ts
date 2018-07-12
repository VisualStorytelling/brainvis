import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvenanceVisualizationComponent } from './provenance-visualization.component';

describe('ProvenanceVisualizationComponent', () => {
  let component: ProvenanceVisualizationComponent;
  let fixture: ComponentFixture<ProvenanceVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvenanceVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvenanceVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

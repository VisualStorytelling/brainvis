import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvenanceSlidesComponent } from './provenance-slides.component';

describe('ProvenanceSlidesComponent', () => {
  let component: ProvenanceSlidesComponent;
  let fixture: ComponentFixture<ProvenanceSlidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvenanceSlidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvenanceSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

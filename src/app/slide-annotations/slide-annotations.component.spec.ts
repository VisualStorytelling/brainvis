import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAnnotationsComponent } from './slide-annotations.component';

describe('SlideAnnotationComponent', () => {
  let component: SlideAnnotationsComponent;
  let fixture: ComponentFixture<SlideAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideAnnotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesContainerComponent } from './slides-container.component';

describe('SlidesContainerComponent', () => {
  let component: SlidesContainerComponent;
  let fixture: ComponentFixture<SlidesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

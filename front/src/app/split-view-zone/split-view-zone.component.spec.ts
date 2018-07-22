import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitViewZoneComponent } from './split-view-zone.component';

describe('SplitViewZoneComponent', () => {
  let component: SplitViewZoneComponent;
  let fixture: ComponentFixture<SplitViewZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitViewZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitViewZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

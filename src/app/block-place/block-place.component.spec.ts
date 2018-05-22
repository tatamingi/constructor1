import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockPlaceComponent } from './block-place.component';

describe('BlockPlaceComponent', () => {
  let component: BlockPlaceComponent;
  let fixture: ComponentFixture<BlockPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

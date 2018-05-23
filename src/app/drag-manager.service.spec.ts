import { TestBed, inject } from '@angular/core/testing';

import { DragManagerService } from './drag-manager.service';

describe('DragManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragManagerService]
    });
  });

  it('should be created', inject([DragManagerService], (service: DragManagerService) => {
    expect(service).toBeTruthy();
  }));
});

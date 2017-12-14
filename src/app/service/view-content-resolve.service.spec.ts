import { TestBed, inject } from '@angular/core/testing';

import { ViewContentResolveService } from './view-content-resolve.service';

describe('ViewContentResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewContentResolveService]
    });
  });

  it('should be created', inject([ViewContentResolveService], (service: ViewContentResolveService) => {
    expect(service).toBeTruthy();
  }));
});

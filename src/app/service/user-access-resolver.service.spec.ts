import { TestBed, inject } from '@angular/core/testing';

import { UserAccessResolverService } from './user-access-resolver.service';

describe('UserAccessResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAccessResolverService]
    });
  });

  it('should be created', inject([UserAccessResolverService], (service: UserAccessResolverService) => {
    expect(service).toBeTruthy();
  }));
});

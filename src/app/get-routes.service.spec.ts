import { TestBed } from '@angular/core/testing';

import { GetRoutesService } from './get-routes.service';

describe('GetRoutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRoutesService = TestBed.get(GetRoutesService);
    expect(service).toBeTruthy();
  });
});

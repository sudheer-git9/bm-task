import { TestBed } from '@angular/core/testing';

import { BmApiService } from './bm-api.service';

describe('BmApiService', () => {
  let service: BmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

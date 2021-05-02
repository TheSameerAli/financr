import { TestBed } from '@angular/core/testing';

import { OverviewDataService } from './overview-data.service';

describe('OverviewDataService', () => {
  let service: OverviewDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverviewDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

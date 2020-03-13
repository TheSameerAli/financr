import { TestBed } from '@angular/core/testing';

import { FinancialHealthService } from './financial-health.service';

describe('FinancialHealthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinancialHealthService = TestBed.get(FinancialHealthService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RecurringTransactionService } from './recurring-transaction.service';

describe('RecurringTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecurringTransactionService = TestBed.get(RecurringTransactionService);
    expect(service).toBeTruthy();
  });
});

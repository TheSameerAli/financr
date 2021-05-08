import * as fromAccount from './account.actions';

describe('loadAccounts', () => {
  it('should return an action', () => {
    expect(fromAccount.loadAccountsRequest().type).toBe('[Account] Load Accounts');
  });
});

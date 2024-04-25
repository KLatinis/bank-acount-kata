import {Account} from "../domain/Account";

describe('BankAccount', () => {
  it('should be able to deposit money', () => {
      let account = new Account();
      account.deposit(100);
      expect(account.balance).toBe(100);
  });

  it('should be able to withdraw money', () => {
      let account = new Account();
      account.withdraw(100);
      expect(account.balance).toBe(-100);
    });
});

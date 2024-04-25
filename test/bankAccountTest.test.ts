import {Account} from "../domain/Account";

describe('BankAccount', () => {
  it('should be able to deposit money', () => {
      let account = new Account();
      account.deposit(100, new Date());
      expect(account.balance).toBe(100);
  });

  it('should be able to withdraw money', () => {
      let account = new Account();
      account.withdraw(100, new Date());
      expect(account.balance).toBe(-100);
    });

  it('should display account statement sorted by date desc', () => {
      const account = new Account();
      const date = new Date(2024, 3, 25);

      account.deposit(50, date);
      account.withdraw(100, date);

      // TODO: Make sure we are sorting by date
      const transactions: any[] = account.transactions;

      expect(transactions).toHaveLength(2);

      expect(transactions[0].amountToString()).toBe('+50');
      expect(transactions[0].dateToString()).toBe('25.4.2024');
      expect(transactions[0].balanceToString()).toBe('50');

      expect(transactions[1].amountToString()).toBe('-100');
      expect(transactions[1].dateToString()).toBe('25.4.2024');
      expect(transactions[1].balanceToString()).toBe('-50');
  });
});

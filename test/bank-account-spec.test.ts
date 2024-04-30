import {Account} from "../domain/account";
import {AccountManager} from "../domain/account-manager";
import {TransactionType} from "../domain/transaction";

describe('BankAccount', () => {
  it('should be able to deposit money', () => {
      let account = new Account(true);
      account.deposit(100, new Date());
      expect(account.balance).toBe(100);
  });

  it('should be able to withdraw money', () => {
      let account = new Account(true);
      account.withdraw(100, new Date());
      expect(account.balance).toBe(-100);
  });

  it('should display account statements sorted by date desc', () => {
      const account = new Account(true);
        const date = new Date(2024, 3, 25);
        const date2 = new Date(2024, 3, 26);

        account.deposit(50, date);
        account.withdraw(100, date2);

        expect(account.transactionsToString()).toBe(
            'Date'.padEnd(12) + 'Amount'.padStart(12) + 'Balance'.padStart(12) + '\n' +
            '26.4.2024'.padEnd(12) + '-100'.padStart(12) + '-50'.padStart(12) + '\n' +
            '25.4.2024'.padEnd(12) + '+50'.padStart(12) + '50'.padStart(12)
        );
  });

  it('should display account statements sorted by date asc', () => {
        const account = new Account(true);
            const date = new Date(2024, 3, 25);
            const date2 = new Date(2024, 3, 26);

            account.deposit(50, date);
            account.withdraw(100, date2);

            expect(account.transactionsToString('asc')).toBe(
                'Date'.padEnd(12) + 'Amount'.padStart(12) + 'Balance'.padStart(12) + '\n' +
                '25.4.2024'.padEnd(12) + '+50'.padStart(12) + '50'.padStart(12) + '\n' +
                '26.4.2024'.padEnd(12) + '-100'.padStart(12) + '-50'.padStart(12)
            );
  });

  it('should transfer money between iban accounts', () => {
      const accountManager = new AccountManager();
      const account1 = accountManager.createAccount(true);
      const account2 = accountManager.createAccount(true);

      account1.deposit(100, new Date());

      expect(account1).toBeDefined();
      expect(account2).toBeDefined();

      accountManager.transfer(account1.id, account2.id, 100, new Date());

      expect(account1.balance).toBe(0);
      expect(account2.balance).toBe(100);
  });

    it('should not transfer money between non-iban accounts', () => {
        const accountManager = new AccountManager();
        const account1 = accountManager.createAccount(true);
        const account2 = accountManager.createAccount(false);

        account1.deposit(100, new Date());

        expect(account1).toBeDefined();
        expect(account2).toBeDefined();

        expect(() => accountManager.transfer(account1.id, account2.id, 100, new Date())).toThrow('Both accounts must be IBAN accounts');
    });

    it('should filter transactions by type', () => {
        const account = new Account(true);
        const date = new Date(2024, 3, 25);
        const date2 = new Date(2024, 3, 26);

        account.deposit(50, date);
        account.withdraw(100, date2);

        const transactions = account.getTransactions('desc', {type: TransactionType.DEPOSIT});

        expect(transactions.length).toBe(1);
        expect(transactions[0].type).toBe(TransactionType.DEPOSIT);
        expect(transactions[0].amount).toBe(50);
        expect(transactions[0].balance).toBe(50);
        expect(transactions[0].date).toBe(date);
    });

    it('should filter transactions by date', () => {
        const account = new Account(true);
        const date = new Date(2024, 3, 25);
        const date2 = new Date(2024, 3, 26);

        account.deposit(50, date);
        account.withdraw(100, date2);

        const transactions = account.getTransactions('desc', {minDate: date2});

        expect(transactions.length).toBe(1);
        expect(transactions[0].type).toBe(TransactionType.WITHDRAWAL);
        expect(transactions[0].amount).toBe(100);
        expect(transactions[0].balance).toBe(-50);
        expect(transactions[0].date).toBe(date2);
    });

    it('should filter transactions by type and date', () => {
        const account = new Account(true);
        const date = new Date(2024, 3, 25);
        const date2 = new Date(2024, 3, 26);

        account.deposit(50, date);
        account.withdraw(100, date2);

        const transactions = account.getTransactions('desc', {type: TransactionType.WITHDRAWAL, minDate: date2});

        expect(transactions.length).toBe(1);
        expect(transactions[0].type).toBe(TransactionType.WITHDRAWAL);
        expect(transactions[0].amount).toBe(100);
        expect(transactions[0].balance).toBe(-50);
        expect(transactions[0].date).toBe(date2);
    });

    it('should get first 10 transactions', () => {
        const account = new Account(true);
        const date = new Date(2024, 3, 25);

        for (let i = 0; i < 20; i++) {
            account.deposit(100, date);
        }

        const transactions = account.getPaginatedTransactions(1);
        expect(transactions.data.length).toBe(10);
        expect(transactions.totalItems).toBe(20);
        expect(transactions.pageSize).toBe(10);
        expect(transactions.currentPage).toBe(1);
        expect(transactions.last).toBe(2);
        expect(transactions.next).toBe(2);
        expect(transactions.previous).toBe(null);
    });
});

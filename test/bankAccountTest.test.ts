import {Account} from "../domain/Account";
import {TransactionType} from "../domain/Transaction";

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

        account.deposit(100, new Date(2024, 3, 25));
        account.withdraw(50, new Date(2024, 3, 26));
        account.withdraw(25, new Date(2024, 3, 24));

        const transactions: any[] = account.transactionsOrderedByDate();

        expect(transactions).toHaveLength(3);
        expect(transactions[2].amountToString()).toBe('-25');
        expect(transactions[2].dateToString()).toBe('24.4.2024');
        expect(transactions[2].balanceToString()).toBe('-25');

        expect(transactions[1].amountToString()).toBe('+100');
        expect(transactions[1].dateToString()).toBe('25.4.2024');
        expect(transactions[1].balanceToString()).toBe('75');

        expect(transactions[0].amountToString()).toBe('-50');
        expect(transactions[0].dateToString()).toBe('26.4.2024');
        expect(transactions[0].balanceToString()).toBe('25');
    });


    it('should display account statement sorted by date asc', () => {
        const account = new Account();

        account.deposit(100, new Date(2024, 3, 25));
        account.withdraw(50, new Date(2024, 3, 26));
        account.withdraw(25, new Date(2024, 3, 24));

        const transactions: any[] = account.transactionsOrderedByDate('asc');

        expect(transactions).toHaveLength(3);

        expect(transactions[0].amountToString()).toBe('-25');
        expect(transactions[0].dateToString()).toBe('24.4.2024');
        expect(transactions[0].balanceToString()).toBe('-25');

        expect(transactions[1].amountToString()).toBe('+100');
        expect(transactions[1].dateToString()).toBe('25.4.2024');
        expect(transactions[1].balanceToString()).toBe('75');

        expect(transactions[2].amountToString()).toBe('-50');
        expect(transactions[2].dateToString()).toBe('26.4.2024');
        expect(transactions[2].balanceToString()).toBe('25');
    });

    it('should find deposits', () => {
        const account = new Account();

        account.deposit(100, new Date(2024, 3, 25));
        account.withdraw(50, new Date(2024, 3, 26));
        account.withdraw(25, new Date(2024, 3, 24));

        const deposits: any[] = account.deposits();

        expect(deposits).toHaveLength(1);

        expect(deposits[0].amountToString()).toBe('+100');
        expect(deposits[0].dateToString()).toBe('25.4.2024');
        expect(deposits[0].type).toBe(TransactionType.DEPOSIT);
    })


    it('should find withdrawals', () => {
        const account = new Account();

        account.deposit(100, new Date(2024, 3, 25));
        account.withdraw(50, new Date(2024, 3, 26));
        account.withdraw(25, new Date(2024, 3, 24));

        const withdrawals: any[] = account.withdrawals();

        expect(withdrawals).toHaveLength(2);

        expect(withdrawals[0].amountToString()).toBe('-50');
        expect(withdrawals[0].dateToString()).toBe('26.4.2024');
        expect(withdrawals[0].type).toBe(TransactionType.WITHDRAWAL);

        expect(withdrawals[1].amountToString()).toBe('-25');
        expect(withdrawals[1].dateToString()).toBe('24.4.2024');
        expect(withdrawals[1].type).toBe(TransactionType.WITHDRAWAL);
    })

    it('should find transactions in a date range', () => {
        const account = new Account();

        account.deposit(100, new Date(2024, 3, 25));
        account.withdraw(50, new Date(2024, 3, 26));
        account.withdraw(25, new Date(2024, 3, 24));

        const dateRangeStart = new Date(2024, 3, 24);
        const dateRangeEnd = new Date(2024, 3, 25);

        const transactions: any[] = account.getTransactionsByDateRange(dateRangeStart, dateRangeEnd);

        expect(transactions).toHaveLength(2);

        expect(transactions[0].amountToString()).toBe('+100');
        expect(transactions[0].dateToString()).toBe('25.4.2024');
        expect(transactions[0].type).toBe(TransactionType.DEPOSIT);

        expect(transactions[1].amountToString()).toBe('-25');
        expect(transactions[1].dateToString()).toBe('24.4.2024');
        expect(transactions[1].type).toBe(TransactionType.WITHDRAWAL);
    })
});

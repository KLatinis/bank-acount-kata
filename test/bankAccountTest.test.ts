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

        const deposits: any[] = account.withdrawals();

        expect(deposits).toHaveLength(1);

        expect(deposits[0].amountToString()).toBe('+100');
        expect(deposits[0].dateToString()).toBe('25.4.2024');
        expect(deposits[0].type).toBe(TransactionType.DEPOSIT);
    })
});

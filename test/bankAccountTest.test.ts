import {Account} from "../domain/Account";
import {TransactionType} from "../domain/Transaction";

describe('BankAccount', () => {
    const account = new Account();

    account.deposit(100, new Date(2024, 3, 25));
    account.withdraw(50, new Date(2024, 3, 26));
    account.withdraw(25, new Date(2024, 3, 24));

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

        const transactions: any[] = account.getAllTransactions();

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
        const transactions: any[] = account.getAllTransactions('asc');

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
        const deposits: any[] = account.deposits();

        expect(deposits).toHaveLength(1);

        expect(deposits[0].amountToString()).toBe('+100');
        expect(deposits[0].dateToString()).toBe('25.4.2024');
        expect(deposits[0].type).toBe(TransactionType.DEPOSIT);
    })

    it('should find withdrawals', () => {
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

    it('should find deposits in a date range', () => {
        const dateRangeStart = new Date(2024, 3, 24);
        const dateRangeEnd = new Date(2024, 3, 25);

        let transactions: any[] = account.getTransactionsByTypeAndDateRange(TransactionType.DEPOSIT, dateRangeStart, dateRangeEnd);

        expect(transactions).toHaveLength(1);

        expect(transactions[0].amountToString()).toBe('+100');
        expect(transactions[0].dateToString()).toBe('25.4.2024');
        expect(transactions[0].type).toBe(TransactionType.DEPOSIT);


        transactions = account.getTransactionsByTypeAndDateRange(TransactionType.DEPOSIT, new Date(2024, 3, 23), new Date(2024, 3, 24));
        expect(transactions).toHaveLength(0);

        transactions = account.getTransactionsByTypeAndDateRange(TransactionType.WITHDRAWAL, new Date(2024, 3, 23), new Date(2024, 3, 24));
        expect(transactions).toHaveLength(1);

        transactions = account.getTransactionsByTypeAndDateRange(TransactionType.WITHDRAWAL, new Date(2024, 3, 23), new Date(2024, 3, 26));
        expect(transactions).toHaveLength(2);
    });

    it('should find withdrawals ordered by date',()=>{
        let dateRangeStart = new Date(2024, 3, 23);
        let dateRangeEnd = new Date(2024, 3, 26);

        let transactions = account.getTransactionsByTypeAndDateRange(TransactionType.WITHDRAWAL, dateRangeStart, dateRangeEnd, 'asc');
        expect(transactions).toHaveLength(2);
        expect(transactions[0].amountToString()).toBe('-25');
        expect(transactions[1].amountToString()).toBe('-50');

        transactions = account.getTransactionsByTypeAndDateRange(TransactionType.WITHDRAWAL, dateRangeStart, dateRangeEnd, 'desc');
        expect(transactions).toHaveLength(2);
        expect(transactions[0].amountToString()).toBe('-50');
        expect(transactions[1].amountToString()).toBe('-25');

        dateRangeEnd = new Date(2024,3,25);
        transactions = account.getTransactionsByTypeAndDateRange(TransactionType.WITHDRAWAL, dateRangeStart, dateRangeEnd, 'desc');
        expect(transactions).toHaveLength(1);
        expect(transactions[0].amountToString()).toBe('-25');

        transactions = account.withdrawals('asc');
        expect(transactions).toHaveLength(2);
        expect(transactions[0].amountToString()).toBe('-25');
        expect(transactions[1].amountToString()).toBe('-50');

        transactions = account.deposits('asc');
        expect(transactions).toHaveLength(1);
    });

    it('should return first page with 10 elements', () => {
        account.deposit(100, new Date(2024, 3, 27));
        account.deposit(150, new Date(2024, 3, 28));
        account.deposit(200, new Date(2024, 3, 30));
        account.deposit(100, new Date(2024, 3, 21));
        account.withdraw(50, new Date(2024, 3, 20));
        account.withdraw(50, new Date(2024, 3, 19));
        account.deposit(100, new Date(2024, 3, 22));
        account.withdraw(50, new Date(2024, 3, 23));
        account.withdraw(50, new Date(2024, 3, 24));

        const transactions = account.getAllTransactions();
        expect(transactions).toHaveLength(10);
        expect(transactions[0].dateToString()).toBe('30.4.2024');
        expect(transactions[9].dateToString()).toBe('21.4.2024');
    });
});

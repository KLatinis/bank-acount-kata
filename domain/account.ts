import {Transaction, TransactionType} from "./transaction";
import {PaginatedData} from "../data/paginated-data";

export interface TransactionFilter {
    type?: TransactionType;
    minDate?: Date;
    maxDate?: Date;
}

export class Account {
    readonly id: number;
    private static nextId = 1;

    balance;
    private _transactions: Transaction[] = [];
    readonly iban: boolean;

    constructor(iban: boolean) {
        this.id = Account.nextId++;
        this.balance = 0;
        this.iban = iban;
    }

    deposit(amount: number, date: Date){
        this.balance += amount;

        const transaction = new Transaction(TransactionType.DEPOSIT, amount, date, this.balance);
        this._transactions.push(transaction);
    }

    withdraw(amount: number, date: Date){
        this.balance -= amount;

        const transaction = new Transaction(TransactionType.WITHDRAWAL, amount, date, this.balance);
        this._transactions.push(transaction);
    }

    transactionsToString(sortDate: 'asc'|'desc' = 'desc') {
        const colGap = 12;

        const header = 'Date'.padEnd(colGap) + 'Amount'.padStart(colGap) + 'Balance'.padStart(colGap) + '\n';
        const transactions = this.getTransactions(sortDate).map(transaction => {
            return transaction.dateToString().padEnd(colGap) + transaction.amountToString().padStart(colGap) + transaction.balanceToString().padStart(colGap);
        }).join('\n');

        return header + transactions;
    }

    getTransactions(sortDate: 'asc'|'desc' = 'desc', filter?: TransactionFilter) {
        let transactions = this._transactions;

        if (filter) {
            transactions = transactions.filter(transaction => {
                const filterType = filter.type !== undefined ? transaction.type === filter.type : true;
                const filterMinDate = filter.minDate !== undefined ? transaction.date >= filter.minDate : true;
                const filterMaxDate = filter.maxDate !== undefined ? transaction.date <= filter.maxDate : true;

                return filterType && filterMinDate && filterMaxDate;
            });
        }

        if (sortDate === 'asc') {
            transactions = transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
        } else {
            transactions = transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        return transactions;
    }

    getPaginatedTransactions(page: number, sortDate: 'asc'|'desc' = 'desc', filter?: TransactionFilter): PaginatedData<Transaction> {
        const transactions = this.getTransactions(sortDate, filter);

        const start = (page - 1) * 10;
        const end = start + 10;
        const last = Math.ceil(transactions.length / 10);
        const total = transactions.length;

        return {
            data: transactions.slice(start, end),
            currentPage: page,
            pageSize: 10,
            totalItems: total,
            next: page < last ? page + 1 : null,
            previous: page > 1 ? page - 1 : null,
            last
        };
    }
}

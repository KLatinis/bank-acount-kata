import {Transaction, TransactionType} from "./Transaction";

export class Account {
    balance = 0;
    transactions: Transaction[] = [];

    deposit(amount: number, date: Date){
        this.balance += amount;

        const transaction = new Transaction(TransactionType.DEPOSIT, amount, date);
        this.transactions.push(transaction);
    }

    withdraw(amount: number, date: Date){
        this.balance -= amount;

        const transaction = new Transaction(TransactionType.WITHDRAWAL, amount, date);
        this.transactions.push(transaction);
    }

    transactionsOrderedByDate(sortOrder: string = 'desc'){
        let balance = 0;

        const orderedTransactions = this.transactions.sort(this.getSortingExpression('asc'));
        orderedTransactions.forEach(transaction => {
            balance += transaction.amount;
            transaction.setBalance(balance);
        });

        return orderedTransactions.sort(this.getSortingExpression(sortOrder));
    }

    deposits(){
        return this.getTransactions(TransactionType.DEPOSIT);
    }

    withdrawals(){
        return this.getTransactions(TransactionType.WITHDRAWAL);
    }

    getTransactionsByDateRange(startDate: Date, endDate: Date){
        return this.getTransactions(undefined, startDate, endDate);
    }

    getTransactions(type?: TransactionType, startDate?: Date, endDate?: Date){
        let result = this.transactions.filter(transaction => type === undefined || transaction.type === type);
        if (startDate) result = result.filter(transaction => transaction.date >= startDate);
        if (endDate) result = result.filter(transaction => transaction.date <= endDate);
        return result;
    }

    private getSortingExpression(sortOrder: string) {
        return (x: Transaction, y: Transaction) => {
            if (x.date < y.date) return sortOrder === 'asc' ? -1 : 1;
            if (x.date > y.date) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        };
    }
}

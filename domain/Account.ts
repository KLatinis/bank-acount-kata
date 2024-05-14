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

    private updateTransactionsBalance(){
        let balance = 0;

        const orderedTransactions = this.transactions.sort(this.getSortingExpression('asc'));
        orderedTransactions.forEach(transaction => {
            balance += transaction.amount;
            transaction.setBalance(balance);
        });
    }

    deposits(sortOrder: string = 'desc'){
        return this.getTransactions(TransactionType.DEPOSIT, undefined, undefined, sortOrder);
    }

    withdrawals(sortOrder: string = 'desc'){
        return this.getTransactions(TransactionType.WITHDRAWAL, undefined, undefined, sortOrder);
    }

    getTransactionsByDateRange(startDate: Date, endDate: Date, sortOrder: string = 'desc'){
        return this.getTransactions(undefined, startDate, endDate, sortOrder);
    }

    getTransactionsByTypeAndDateRange(type: TransactionType, startDate: Date, endDate:Date, sortOrder: string = 'desc'){
        return this.getTransactions(type, startDate, endDate, sortOrder);
    }

    getPaginatedTransactions(page: number, sortOrder:string = 'desc'){
        this.transactionsPagination.pageNumber = page;

        const firstElementToReturn = Math.min(this.transactionsPagination.pageSize * (page - 1), this.transactions.length);
        const lastElementToReturn = Math.min(firstElementToReturn + 10, this.transactions.length);

        return this.getTransactions(undefined, undefined, undefined, sortOrder).slice(firstElementToReturn, lastElementToReturn);
    }

    getFirstPage(){
        return this.getPaginatedTransactions(1);
    }

    getNextPage(){
        return this.getPaginatedTransactions(this.transactionsPagination.pageNumber + 1);
    }

    getPreviousPage(){
        return this.getPaginatedTransactions(Math.max(this.transactionsPagination.pageNumber - 1, 1));
    }

    private getTransactions(type?: TransactionType, startDate?: Date, endDate?: Date, sortOrder: string = 'desc'){
        this.updateTransactionsBalance();

        let result = this.transactions.filter(transaction => type === undefined || transaction.type === type);
        if (startDate) result = result.filter(transaction => transaction.date >= startDate);
        if (endDate) result = result.filter(transaction => transaction.date <= endDate);

        return result.sort(this.getSortingExpression(sortOrder));
    }

    private getSortingExpression(sortOrder: string) {
        return (x: Transaction, y: Transaction) => {
            if (x.date < y.date) return sortOrder === 'asc' ? -1 : 1;
            if (x.date > y.date) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        };
    }

    transactionsPagination = {
        pageSize: 10,
        pageNumber: 1
    }
}

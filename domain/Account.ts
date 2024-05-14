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

    deposits(dateSortOrder: string = 'desc'){
        return this.getTransactions(TransactionType.DEPOSIT, undefined, undefined, dateSortOrder);
    }

    withdrawals(dateSortOrder: string = 'desc'){
        return this.getTransactions(TransactionType.WITHDRAWAL, undefined, undefined, dateSortOrder);
    }

    getTransactionsByDateRange(startDate: Date, endDate: Date, dateSortOrder: string = 'desc'){
        return this.getTransactions(undefined, startDate, endDate, dateSortOrder);
    }

    getTransactionsByTypeAndDateRange(type: TransactionType, startDate: Date, endDate:Date, dateSortOrder: string = 'desc'){
        return this.getTransactions(type, startDate, endDate, dateSortOrder);
    }

    private getPaginatedTransactions(page: number, dateSortOrder: string = 'desc'){
        this.transactionsPagination.pageNumber = page;

        const firstElementToReturn = Math.min(this.transactionsPagination.pageSize * (page - 1), this.transactions.length);
        const lastElementToReturn = Math.min(firstElementToReturn + 10, this.transactions.length);

        return this.getTransactions(undefined, undefined, undefined, dateSortOrder).slice(firstElementToReturn, lastElementToReturn);
    }

    getFirstPage(dateSortOrder: string = 'desc') {
        return this.getPaginatedTransactions(1, dateSortOrder);
    }

    getNextPage(dateSortOrder: string = 'desc'){
        return this.getPaginatedTransactions(this.transactionsPagination.pageNumber + 1, dateSortOrder);
    }

    getPreviousPage(dateSortOrder: string = 'desc'){
        return this.getPaginatedTransactions(Math.max(this.transactionsPagination.pageNumber - 1, 1), dateSortOrder);
    }

    private getTransactions(type?: TransactionType, startDate?: Date, endDate?: Date, dateSortOrder: string = 'desc'){
        this.updateTransactionsBalance();

        let result = this.transactions.filter(transaction => type === undefined || transaction.type === type);
        if (startDate) result = result.filter(transaction => transaction.date >= startDate);
        if (endDate) result = result.filter(transaction => transaction.date <= endDate);

        return result.sort(this.getSortingExpression(dateSortOrder));
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

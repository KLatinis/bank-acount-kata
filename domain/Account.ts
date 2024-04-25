import {Transaction, TransactionType} from "./Transaction";

export class Account {
    balance = 0;
    transactions: Transaction[] = [];

    deposit(amount: number, date: Date){
        this.balance += amount;

        const transaction = new Transaction(TransactionType.DEPOSIT, amount, date, this.balance);
        this.transactions.push(transaction);
    }

    withdraw(amount: number, date: Date){
        this.balance -= amount;

        const transaction = new Transaction(TransactionType.WITHDRAWAL, amount, date, this.balance);
        this.transactions.push(transaction);
    }
}

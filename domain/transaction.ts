export enum TransactionType {
    DEPOSIT, WITHDRAWAL
}

export class Transaction {
    readonly type: TransactionType;
    readonly amount: number;
    readonly date: Date;
    readonly balance: number;

    constructor(type: TransactionType, amount: number, date: Date, balance: number) {
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.balance = balance;
    }

    amountToString() {
        switch (this.type) {
            case TransactionType.DEPOSIT:
                return '+' + this.amount;
            case TransactionType.WITHDRAWAL:
                return '-' + this.amount
        }
    }

    dateToString() {
        return this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
    }

    balanceToString() {
        return this.balance.toString();
    }
}

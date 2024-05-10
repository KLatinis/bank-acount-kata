export enum TransactionType {
    DEPOSIT, WITHDRAWAL
}

export class Transaction {
    readonly type: TransactionType;
    readonly amount: number;
    readonly date: Date;
    private balance: number = 0;

    constructor(type: TransactionType, amount: number, date: Date) {
        this.type = type;
        this.amount = type == TransactionType.DEPOSIT ? amount : (-1*amount);
        this.date = date
    }

    amountToString() {
        switch (this.type) {
            case TransactionType.DEPOSIT:
                return '+' + this.amount;
            case TransactionType.WITHDRAWAL:
                return '' + this.amount
        }
    }

    dateToString() {
        return this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
    }

    setBalance(balance: number) {
        this.balance = balance;
    }

    balanceToString() {
        return this.balance.toString();
    }
}

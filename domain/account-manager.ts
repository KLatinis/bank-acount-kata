import {Account} from "./account";

export class AccountManager {
    private _accounts: Account[] = [];

    createAccount(iban: boolean) {
        const account = new Account(iban);
        this._accounts.push(account);

        return account;
    }

    getAccountById(id: number) {
        return this._accounts.find(account => account.id === id);
    }

    transfer(fromAccountId: number, toAccountId: number, amount: number, date: Date) {
        const fromAccount = this.getAccountById(fromAccountId);
        const toAccount = this.getAccountById(toAccountId);

        if (fromAccount && toAccount) {
            if (!fromAccount.iban || !toAccount.iban) throw new Error('Both accounts must be IBAN accounts');

            fromAccount.withdraw(amount, date);
            toAccount.deposit(amount, date);
        }
    }
}

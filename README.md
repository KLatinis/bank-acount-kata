# bank-account-kata

## Requirements

- No user authentication required.
- As a user I want to deposit money to my account.
- As a user I want to withdraw money from my account.
- As a user I want to transfer money to another account (only IBAN accounts supported).
    - Application must prevent user from sending money to a non-IBAN account.
- As a user I want to see my account statement (date, amount, balance).
    - Application must display the account statement sorted by date (most recent first), by default. Example:
        
        ```
        Date        Amount  Balance
        23.8.2016     -100      400
        24.12.2015    +500      500
        ```
        
- Bonus 1
    - As a user I want to sort my account statement by date (in ascending and descending order).
- Bonus 2
    - As a user I want to search movements filtering by deposits, withdrawals and date ranges (combination of filters must be implemented with “AND” logical operator).
    - Application must display search results sorted by date (most recent first), by default.
    - As a user I want to sort search results by date (in ascending and descending order).
- Bonus 3
    - For both account statement and search results, application must paginate movements when there are more than 10 elements.
        - As a user I want to see next page
        - As a user I want to see previous page
        - As a user I want to see first page
        - As a user I want to see last page

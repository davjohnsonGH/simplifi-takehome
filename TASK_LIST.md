## Init

- a. git ignore
- b. branching strategy, will use a dev branch off of main and each task (listed below) will have it's own feat branch off of dev, each one of those branches will then have a sub-task branch, as soon as all those sub-tasks are done and merged we can merge the feat branch
- b.1. or just use naming conventions off of feat, ex: feat-{task} per commit

```
main -> dev -> feat -> task
or
main -> dev -> feat-{task} (commit)

```

## 1. Introduce state management

- a. install toolkit and react-redux
- b. enable folder structure for state management

```
// * new dir || folder
src/
  App.tsx                       # root component
  main.tsx                      # React entry point
  types.ts                      # Category, TransactionCategory, TRANSACTION_CATEGORIES, Transaction
  styles.css                    # global styles
  app/                          * (move App.tsx || main.tsx into this?)
    hooks.ts                    * resusable hooks (start with rtk hooks)
    store.ts                    # store for state with redux
  data/
    transactions.ts             # seed data — mock transactions for the last 7 days
  components/
    DayGroup.tsx                # renders a single day's header + rows
    TransactionRow.tsx          # renders one transaction
  utils/
    format.ts                   # currency + date formatting helpers
    transactions.ts             # grouping / sorting helpers
  features/                     *
    /transactions               * unnecessary?
        treansactionsSlice.ts   * rtk slice for actions and reducers
```

- c. write bare bones slice in treansactionsSlice with add and delete transaction state => state (no change)
- d. create store in app/store.ts for root state and dispatch
- e. create hooks for rtk dispatch and selector
- f. position useAppSelector in App.tsx && main.tsx for redux state managment of transactions

## 2. Add a transaction

- a. create folder structure

```
// * new dir || folder
src/
  App.tsx                       # root component
  main.tsx                      # React entry point
  types.ts                      # Category, TransactionCategory, TRANSACTION_CATEGORIES, Transaction
  styles.css                    # global styles
  app/                          # (move App.tsx into this?)
    hooks.ts                    # resusable hooks (start with rtk hooks)
    store.ts                    # store for state with redux
  data/
    transactions.ts             # seed data — mock transactions for the last 7 days
  components/
    DayGroup.tsx                # renders a single day's header + rows
    TransactionRow.tsx          # renders one transaction
    Modal.tsx                   * agnostic resuable modal
    Datepicker.tsx              * agnostic resuable date picker
    NumberInput.tsx             * agnostic resuable number input
    TextInput.tsx               * agnostic resuable text input
    Select.tsx                  * agnostic resuable select
    NewTransactionForm.tsx      * aggergation of datepicker, number and text inputs and select to enable a uer to create a new transaction
  utils/
    format.ts                   # currency + date formatting helpers
    transactions.ts             # grouping / sorting helpers
  features/                     #
    /transactions               # unnecessary?
        treansactionsSlice.ts   # rtk slice for actions and reducers
```

- b. Modal.tsx and place in App.tsx enabled by a button labeled "new transaction"
- c. bare bones NewTransactionForm.tsx, let it surface a "hello world"
- d. Datepicker.tsx and position into NewTransactionForm.tsx
- e. NumberInput.tsx and position into NewTransactionForm.tsx
- f. TextInput.tsx and position into NewTransactionForm.tsx
- g. Select.tsx and position into NewTransactionForm.tsx
- h. logic for onChange, onSubmit, options rendering and logic
- i. implement addTransaction reducer in transactionsSlice and export addTransaction action
- k. styling and cleanup

## 3. Delete a transaction

- a. in TransactionsSlice implement deleteTransaction reducer and export deleteTransaction action
- b. in TransactionRow.tsx enable delete transaction with button, position button within the row under the amount, or to the far right and center align the amount

## 4. Filter by category

- a. update folder structure to include the MultiSelect.tsx component under components/
- b. import multi-select into App.tsx
- c. build multiSelectChange method to capture values[] within change event
- d. enable and update selectedCategories state within component
- e. facilitate selectedCategories into a visableTransacations function
- d. posistion visableTransacations into groupByDay method

## 5. Search (stretch)

- a. update folder structure to house a SerchInput.tsx this would include type-ahead functionality
- b. import SerchInput.tsx into App.tsx
- c. position SerchInput into header of transactions list
- d. build out and leverage visableTransacations functionality to surface selectedCategories, this may be tricky if a user chooses to search and filter in the same action

## 5. Global and clean up

- a. review folder structure to see if this makes sense for exercise vs scalibility
- b. styling
- c. tests??
- e.

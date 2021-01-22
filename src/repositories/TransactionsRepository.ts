import Transaction from '../models/Transaction';

interface CreatedTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // { income, outcome, total }: Balance

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    /* const transactionOutcome = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }

      return 0;
    });

    const transactionIncome = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }

      return 0;
    });

    const incomeResult = transactionIncome.reduce((a, b) => {
      return a + b;
    });

    const outcomeResult = transactionOutcome.reduce((a, b) => {
      return a + b;
    });

    const balance = {
      income: incomeResult,
      outcome: outcomeResult,
      total: incomeResult - outcomeResult,
    }; */

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreatedTransactionDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('This type is invalid!');
    }
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

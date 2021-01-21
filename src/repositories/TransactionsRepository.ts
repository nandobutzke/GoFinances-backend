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

  public getBalance({ income, outcome, total }: Balance): Balance {
    const transactionOutcome = this.transactions.map(transaction => {
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
    };

    return balance;
  }

  public create({ title, value, type }: CreatedTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

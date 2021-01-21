import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactionsList = transactionsRepository.all();

    const { income, outcome, total } = request.query;

    const balance = transactionsRepository.getBalance({
      income,
      outcome,
      total,
    });

    return response.status(200).json({
      transactions: transactionsList,
      balance: balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const transactionService = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = transactionService.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);

    /* const transaction = transactionService.execute({ title, value}) */
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;

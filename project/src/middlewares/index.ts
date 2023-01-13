import express from 'express';
import { addExpressMiddlewares } from '@middlewares/express';

export const addMiddlewares = (server: express.Express) => {
  addExpressMiddlewares(server);
};

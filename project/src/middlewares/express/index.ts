import express from 'express';

export const addExpressMiddlewares = (server: express.Express) => {
  server.use(express.json());
};

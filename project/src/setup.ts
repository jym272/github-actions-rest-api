import express from 'express';
import { addRoutes } from '@routes/index';
import { addMiddlewares } from '@middlewares/index';

const createServer = (): express.Express => {
  return express();
};

const createExpress = () => createServer();

export const initializeSetup = () => {
  const server = createExpress();
  return {
    server
  };
};

export const startSetup = (server: express.Express) => {
  addMiddlewares(server);
  addRoutes(server);
};

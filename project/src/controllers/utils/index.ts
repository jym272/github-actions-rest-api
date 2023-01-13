import { Request, Response } from 'express';

const crashServerController = () => {
  return (req: Request, res: Response) => {
    res.send('Crashing server!');
    process.exit(1);
  };
};

const healthController = () => {
  return (req: Request, res: Response) => {
    res.send('OK');
  };
};

const envController = () => {
  return (req: Request, res: Response) => {
    res.send(process.env);
  };
};

export const utilsController = {
  crashServer: crashServerController(),
  health: healthController(),
  env: envController()
};

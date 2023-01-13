import { Request, Response } from 'express';

const getHomeController = () => {
  return (req: Request, res: Response) => {
    res.send('Hello there!');
  };
};

export const homeController = {
  get: getHomeController()
};

import { Router } from 'express';
import { homeController } from '@controllers/home';

export const home = Router();

home.get('/', homeController.get);

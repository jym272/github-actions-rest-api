import { Router } from 'express';
import { dbController } from '@controllers/db';

export const dbActions = Router();

dbActions.get('/get', dbController.get);
dbActions.post('/save', dbController.save);
dbActions.delete('/delete/:id', dbController.delete);
dbActions.delete('/delete-people-collection', dbController.deletePeopleCollection);

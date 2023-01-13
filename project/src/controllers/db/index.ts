import { Request, Response } from 'express';
import { db } from '@db/index';
import { DecodedPermission, Person } from '@custom-types/index';
import jwt from 'jsonwebtoken';
import { getEnv } from '@utils/index';
import { ObjectId } from 'mongodb';

const secret = getEnv('JWT_SECRET');

// generate Token

// const permission = {
//   delete: true
// };
// const options = {
//   expiresIn: '1d'
// };
// // Generate the JWT
// const token = jwt.sign(permission, secret, options);
// console.log(token)

const getController = () => {
  return async (req: Request, res: Response) => {
    const people = await db.find({}).toArray();
    res.json(people);
  };
};

const saveController = () => {
  return async (req: Request, res: Response) => {
    const { name, age } = req.body as Person;
    const person = { name, age };
    await db.insertOne(person);
    res.json({ message: 'Person saved.' });
  };
};

const deleteController = () => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db.deleteOne({ _id: new ObjectId(id) });
      res.json({ message: 'Person deleted.' });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR: ', err);
      res.status(401).json({ message: 'Delete person failed.' });
      return;
    }
  };
};

const deletePeopleCollectionController = () => {
  return async (req: Request, res: Response) => {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    let token = rawToken;
    if (rawToken.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ERROR: ', err);
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    const permissions = JSON.parse(JSON.stringify(decoded)) as DecodedPermission;
    if (permissions.exp < Math.floor(Date.now() / 1000) || !permissions.delete) {
      res.status(401).json({ message: 'Unauthorized.' });
      return;
    }
    await db.drop();
    res.json({ message: 'Collection deleted.' });
  };
};

export const dbController = {
  get: getController(),
  save: saveController(),
  delete: deleteController(),
  deletePeopleCollection: deletePeopleCollectionController()
};

import express from 'express';
import { home } from '@routes/home';
import { utils } from '@routes/utils';
import { dbActions } from '@routes/db';

const routes = [dbActions, home, utils];

// TODO: better refactgor

// admin.post('/add-product', middlewareController.isAuth, productController.add);
// admin.post('/admin/edit-product', middlewareController.isAuth, productController.edit);
// admin.delete('/admin/edit-product/deleteimage', middlewareController.isAuth, productController.deleteImage);
// admin.post('/admin/edit-product/addimages', middlewareController.isAuth, productController.addImages);
//
// admin.get('/admin/edit-product/:id', middlewareController.isAuth, productController.editForm);
//
// admin.get('/admin', middlewareController.isAuth, middlewareController.pagination, productController.list);
// admin.post('/admin/delete', middlewareController.isAuth, productController.delete);

// export default admin;

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};

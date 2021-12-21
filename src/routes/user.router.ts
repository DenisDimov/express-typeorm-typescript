import Router from 'express';
import { Joi, celebrate } from 'celebrate';

import usersController from '../controller/UserController';
import checkRole from '../middlewares/accessMiddleware';

const router = Router();

router.post(
  '/register',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
      name: Joi.string().min(2).max(30),
      surname: Joi.string().min(2).max(30),
      city: Joi.string().min(2).max(255),
      address: Joi.string().min(2).max(255),
      phone: Joi.string(),
      birthday: Joi.string(),
      role: Joi.string(),
    }),
  }),
  usersController.register,
);
router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
    }),
  }),
  usersController.login,
);
router.get('/users', checkRole(['USER', 'ADMIN']), usersController.usersAll);
router.patch(
  '/users',
  checkRole(['ADMIN', 'USER']),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  usersController.updateUser,
);
router.get('/users/orders');

export default router;

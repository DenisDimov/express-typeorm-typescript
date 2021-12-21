import { celebrate, Joi } from 'celebrate';
import Router from 'express';

import ordersController from '../controller/OrdersController';
import checkRole from '../middlewares/accessMiddleware';

const router = Router();

router.get('/orders', ordersController.ordersAll);
router.post(
  '/orders',
  celebrate({
    body: Joi.object().keys({
      summ: Joi.string().required(),
      discount: Joi.string(),
    }),
  }),
  checkRole(['ADMIN', 'USER']),
  ordersController.createOrder,
);
router.get('/orders/:id', ordersController.oneOrders);
router.patch(
  '/orders/:id',
  celebrate({
    body: Joi.object().keys({
      summ: Joi.string().required(),
      discount: Joi.string().min(5),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  ordersController.updateOrder,
);
router.delete(
  '/orders/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  ordersController.deleteOrder,
);

export default router;

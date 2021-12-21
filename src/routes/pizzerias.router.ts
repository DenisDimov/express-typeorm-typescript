import { celebrate, Joi } from 'celebrate';
import Router from 'express';

import PizzeriasController from '../controller/PizzeriasController';
import checkRole from '../middlewares/accessMiddleware';

const router = Router();

router.get('/pizzerias', PizzeriasController.getPizzerias);
router.post(
  '/pizzerias',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required().max(128),
      city: Joi.string().required().max(128),
      address: Joi.string().required(),
    }),
  }),
  checkRole(['ADMIN']),
  PizzeriasController.createPizzerias,
);
router.get(
  '/pizzerias/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  PizzeriasController.getOnePizzerias,
);
router.patch(
  '/pizzerias/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
    body: Joi.object().keys({
      title: Joi.string().required().max(128),
      city: Joi.string().required().max(128),
      address: Joi.string().required(),
    }),
  }),
  checkRole(['ADMIN']),
  PizzeriasController.updateOnePizzerias,
);
router.delete(
  '/pizzerias/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  PizzeriasController.deleteOnePizzerias,
);

export default router;

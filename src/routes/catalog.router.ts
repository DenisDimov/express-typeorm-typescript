import { celebrate, Joi } from 'celebrate';
import Router from 'express';

import catalogController from '../controller/CatalogController';
import checkRole from '../middlewares/accessMiddleware';

const router = Router();

router.get('/catalogs', checkRole(['ADMIN']), catalogController.getCatalogs);
router.post(
  '/catalog',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().max(128),
      description: Joi.string().max(256),
      price: Joi.string().min(1),
      type: Joi.array().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  catalogController.createCatalog,
);
router.get(
  '/catalog/:id',
  checkRole(['ADMIN']),
  catalogController.getOneCatalog,
);
router.patch(
  '/catalog/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
    body: Joi.object().keys({
      title: Joi.string().max(128),
      description: Joi.string().max(256),
      price: Joi.string().min(1),
      type: Joi.array().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  catalogController.updateOneCatalog,
);
router.delete(
  '/catalog/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().min(1),
    }),
  }),
  checkRole(['ADMIN']),
  catalogController.deleteOneCatalog,
);

export default router;

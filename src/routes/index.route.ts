import Router from 'express';

import userRouter from './user.router';
import catalogRouter from './Catalog.router';
import ordersRouter from './Orders.router';
import pizzeriasRouter from './Pizzerias.router';

const router = Router();

router.use('/', userRouter);
router.use('/', catalogRouter);
router.use('/', ordersRouter);
router.use('/', pizzeriasRouter);

export default router;

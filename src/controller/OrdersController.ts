import { Request, Response, NextFunction } from "express";

import ApiError from "../error/ApiError";
import { Orders } from "../entities/Orders";
import { User } from "../entities/User";
import { Pizzeria } from "../entities/Pizzerias";

class Order {
  async ordersAll(_: Request, res: Response) {
    const orders = await Orders.find({
      relations: ['pizzeria', 'user']
    });
    return res.json(orders);
  }

  async oneOrders(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const oneOrder = await Orders.findOne(id, {relations: ['pizzeria', 'user']});
      return res.json(oneOrder);
    } catch (error) {
      next(ApiError.badRequest("sdf"));
    }
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { summ, discount, id, pizziriaId } = req.body;

    try {
      const user = await User.findOne(id);
      const pizzeria = await Pizzeria.findOne(pizziriaId);

      const createOrder = await Orders.create({
        summ,
        discount,
        user,
        pizzeria,
      });

      await createOrder.save();

      return res.json(createOrder);
    } catch (error) {
      console.log(error);

      next(ApiError.internal("Server error occured"));
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const order = await Orders.findOne(id);

      await order.remove();

      return res.json(order);
    } catch (err) {
      next(ApiError.badRequest("Server error occured"));
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { summ, discount } = req.body;
    try {
      const order = await Orders.findOne(id);
      order.summ = summ || order.summ;
      order.discount = discount || order.discount;

      await order.save();

      return res.json(order);
    } catch (error) {
      next(ApiError.badRequest("Server error occured"));
    }
  }
}

export default new Order();

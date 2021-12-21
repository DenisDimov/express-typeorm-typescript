import { NextFunction, Request, Response } from "express";

import { Pizzeria } from "../entities/Pizzerias";
import ApiError from "../error/ApiError";

class Pizzerias {
  async getPizzerias(req: Request, res: Response, next: NextFunction) {
    const allPizzerias = await Pizzeria.find();
    return res.json(allPizzerias);
  }

  async createPizzerias(req: Request, res: Response, next: NextFunction) {
    const { title, city, address } = req.body;

    try {
      const createPizzeria = await Pizzeria.create({
        title,
        city,
        address,
      });

      await createPizzeria.save();

      return res.json(createPizzeria);
    } catch (error) {
      next(ApiError.internal("Server error occured"));
    }
  }
  async getOnePizzerias(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const onePizzeria = await Pizzeria.findOne({ where: { id } });
      return res.json(onePizzeria);
    } catch (error) {
      next(ApiError.badRequest("sdf"));
    }
  }
  async updateOnePizzerias(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, city, address } = req.body;
    try {
      const pizzeria = await Pizzeria.findOne(id);

      pizzeria.title = title || pizzeria.title;
      pizzeria.city = city || pizzeria.city;
      pizzeria.address = address || pizzeria.address;

      await pizzeria.save();

      return res.json(pizzeria);
    } catch (error) {
      next(ApiError.badRequest("Server error occured"));
    }
  }
  async deleteOnePizzerias(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const pizzeria = await Pizzeria.findOne(id);

      await pizzeria.remove();

      return res.json(pizzeria);
    } catch (err) {
      next(ApiError.badRequest("Server error occured"));
    }
  }
}

export default new Pizzerias();

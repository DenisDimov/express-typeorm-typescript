import { NextFunction, Request, Response } from 'express';

import { Catalog } from '../entities/Catalog';
import ApiError from '../error/ApiError';

class Catalogs {
  async getCatalogs(_: Request, res: Response, next: NextFunction) {
    const allCatalogs = await Catalog.find();
    return res.json(allCatalogs);
  }

  async createCatalog(req: Request, res: Response, next: NextFunction) {
    const { title, description, price, type } = req.body;

    try {
      const createCatalog = await Catalog.create({
        title,
        description,
        price,
        type,
      });

      await createCatalog.save();

      return res.json(createCatalog);
    } catch (error) {
      next(ApiError.internal('Server error occured'));
    }
  }

  async getOneCatalog(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const oneOrder = await Catalog.findOne({ where: { id } });
      return res.json(oneOrder);
    } catch (error) {
      next(ApiError.badRequest('Server error occured'));
    }
  }
  async updateOneCatalog(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const { title, description, price, type } = req.body;
    try {
      const catalog = await Catalog.findOne(id);
      catalog.title = title || catalog.title;
      catalog.description = description || catalog.description;
      catalog.price = price || catalog.price;
      catalog.type = type || catalog.type;

      await catalog.save();

      return res.json(catalog);
    } catch (error) {
      next(ApiError.badRequest('Server error occured'));
    }
  }

  async deleteOneCatalog(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const catalog = await Catalog.findOne(id);

      await catalog.remove();

      return res.json(catalog);
    } catch (err) {
      next(ApiError.badRequest('Server error occured'));
    }
  }
}

export default new Catalogs();

import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';
import ApiError from '../error/ApiError';
import config from '../config/index';

const generateToker = (id: number, email: string, role: string[]) => {
  const payload = {
    id,
    email,
    role,
  };
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '10h' });
};

class Users {
  async register(req: Request, res: Response, next: NextFunction) {
    const {
      email,
      password,
      role,
      name,
      surname,
      city,
      address,
      phone,
      birthday,
    } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password'));
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      return next(
        ApiError.badRequest(`User with this ${email} exists`),
      );
    }
    const hashPassword = await bcrypt.hash(password, 2);
    const user = await User.create({
      email,
      password: hashPassword,
      name,
      surname,
      city,
      address,
      phone,
      birthday,
      role,
    });
    await user.save();

    return res.json(user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(
          ApiError.internal(`User with this ${email} exists`),
        );
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal('Invalid email or password'));
      }
      const token = generateToker(user.id, user.email, user.role);
      return res.json({ user, token });
    }
  }

  async usersAll(_: Request, res: Response) {
    const users = await User.find();
    return res.json(users);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const updateUser = await User.findOneOrFail(id);

      updateUser.email = email || updateUser.email;

      await updateUser.save();

      return res.json(updateUser);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Users();

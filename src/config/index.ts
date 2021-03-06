import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 7000,
  JWT_SECRET: process.env.JWT_SECRET || 'testTest',
  ApiPrefix: process.env.ApiPrefix,
  DB: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_TYPE: process.env.DB_TYPE,
  },
};

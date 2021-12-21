import 'reflect-metadata';
import { createConnection } from 'typeorm';

import app from './app';
import config from './config/index';

const { PORT } = config;

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listen on ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

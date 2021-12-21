import config from './src/config/index';

export default {
  type: config.DB.DB_TYPE,
  host: config.DB.DB_HOST,
  username: config.DB.DB_USER,
  password: config.DB.DB_PASSWORD,
  database: config.DB.DB_NAME,
  port: config.DB.DB_PORT,
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export const databaseConfig = () => ({
  uri_dev: process.env.MONGO_URI_DEV,
  uri_prod: process.env.MONGO_URI_PROD,
});

export const serverConfig = () => ({
  status: process.env.STATUS || 'prod',
  port: process.env.PORT || 3000,
});

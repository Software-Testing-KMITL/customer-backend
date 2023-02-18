export const authConfig = () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN || 'SECRET' 
})
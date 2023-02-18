FROM node:19-alpine as base

FROM base as dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

FROM dependencies as builder

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build

FROM dependencies as runner

# WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]

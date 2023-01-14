FROM node:19-alpine as deps

WORKDIR /app

COPY package.json package-lock.json ./

# clean install - omit devDependencies
RUN npm ci --production

FROM node:19-alpine as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:19-alpine as runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodeuser --ingroup nodejs

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder --chown=nodeuser:nodejs /app/dist ./dist

USER nodeuser

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
FROM node:10-alpine as buildContainer
WORKDIR /app
COPY web/package.json web/package-lock.json /app/
RUN npm install
COPY web/ /app
RUN npm run build:ssr



FROM node:8-alpine
WORKDIR /app

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist
RUN npm install -g pm2


# Serve the app
CMD ["node", "dist/server.js"]

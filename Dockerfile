FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY drizzle.config.ts .
COPY nx.json .
COPY tsconfig.base.json .

CMD ["npx", "nx", "run", "gateway:serve"]

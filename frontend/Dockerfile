FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]

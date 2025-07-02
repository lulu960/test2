FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install --production && npm cache clean --force
COPY . .
CMD ["npm", "start"]

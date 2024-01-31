FROM node:buster
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3004
CMD ["npm", "run", "start:dev"]

# filepath: c:\Users\Varshini\csea_backend\Dockerfile
FROM node:18-alpine
WORKDIR /csea_backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

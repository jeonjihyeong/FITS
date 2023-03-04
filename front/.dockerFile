FROM node:16-alpine
WORKDIR /app
COPY ./front/package*.json ./
RUN npm install
COPY ./front .
CMD ["ls", "-al"]
RUN npm run build
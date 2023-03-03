FROM node:16-alpine
WORKDIR /app
COPY ./front/package*.json ./
RUN nmp install
COPY ./front .
CMD ["ls", "-al"]
RUN npm run build


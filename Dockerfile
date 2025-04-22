FROM node:17-alpine as builder
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.3-alpine
COPY --from=builder /src/dist /usr/share/nginx/html
EXPOSE 80
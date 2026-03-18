# ---------- build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# viteはbuild時に必要
ARG VITE_REACT_APP_API_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build


# ---------- production stage ----------
FROM nginx:alpine

# buildされたファイルを配置
COPY --from=build /app/dist /usr/share/nginx/html

# nginx設定を上書き
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
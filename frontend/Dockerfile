# ---------- build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# build-argで渡す環境変数
ARG VITE_REACT_APP_API_URL

# 依存関係
COPY package*.json ./
RUN npm install

# ソース
COPY . .

# Viteに環境変数を渡してbuild
RUN VITE_REACT_APP_API_URL=$VITE_REACT_APP_API_URL npm run build


# ---------- production stage ----------
FROM nginx:alpine

# buildされたファイルを配置
COPY --from=build /app/dist /usr/share/nginx/html

# nginx設定を上書き
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
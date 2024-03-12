# Используйте официальный образ Node.js в качестве базового
FROM node:16

# Установите Nginx
RUN apt-get update && apt-get install -y nginx

# Создайте рабочую директорию для приложения
WORKDIR /usr/src/app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте исходный код приложения
COPY . .

# Соберите приложение
RUN npm run build

# Настройте Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Откройте порт 80
EXPOSE 80

# Запустите Nginx и Node.js приложение
CMD ["nginx", "-g", "daemon off;"] && node src/index.js

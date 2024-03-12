# Используем образ Node.js для сборки
FROM node:16 as builder

WORKDIR /usr/src/app

COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы
COPY . .

# Строим приложение
RUN npm run build

# Создаем новый образ для Nginx
FROM nginx:latest

# Копируем статические файлы из предыдущего образа (Node.js)
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Копируем файл конфигурации Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Порт, который будет слушать Nginx
EXPOSE 80

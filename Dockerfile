FROM node:18-slim

# Installa dipendenze di sistema per Puppeteer
RUN apt-get update && apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libgbm1 \
  libasound2 \
  libpangocairo-1.0-0 \
  libxss1 \
  libgtk-3-0 \
  libxshmfence1 \
  libglu1-mesa \
  chromium

WORKDIR /app

COPY package.json package-lock.json* ./  
RUN npm install

COPY . .

# Variabili d'ambiente per Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

EXPOSE 8080

CMD ["node", "index.js"]

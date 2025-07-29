FROM node:18-slim

# Installazione dipendenze di sistema necessarie per Puppeteer
RUN apt-get update && apt-get install -y \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libgbm1 libasound2 libpangocairo-1.0-0 \
  libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libxss1 libxtst6 libxshmfence1 libgtk-3-0 \
  libxfixes3 libxrender1 libxext6 libx11-6 chromium \
  --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia file package.json e package-lock.json (se c'è)
COPY package*.json ./

RUN npm install

COPY . .

# Variabili d'ambiente per Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

EXPOSE 8080

CMD ["node", "index.js"]

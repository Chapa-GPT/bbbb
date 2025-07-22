# Etapa 1: Usar uma imagem base oficial do Node.js v18.
FROM node:18-alpine

# Etapa 2: Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copiar os arquivos de dependência e instalar de forma otimizada
COPY package*.json ./
RUN npm install

# Etapa 4: Copiar o restante do código da sua aplicação
COPY . .

# Etapa 5: Expor a porta 8080 para comunicação
EXPOSE 8080

# Etapa 6: O comando final para iniciar sua aplicação
CMD ["node", "index.js"]
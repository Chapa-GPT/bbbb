# Etapa 1: Usar uma imagem base oficial do Node.js. A versão Alpine é leve.
FROM node:18-alpine

# Etapa 2: Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Etapa 3: Copiar os arquivos de dependência e instalar
# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./
# Instala as dependências do projeto
RUN npm install

# Etapa 4: Copiar o restante do código da sua aplicação
COPY . .

# Etapa 5: Expor a porta que sua aplicação usa para se comunicar
# O Back4App espera que a porta seja a 8080
EXPOSE 8080

# Etapa 6: O comando final para iniciar sua aplicação
# Substitua 'index.js' pelo nome do seu arquivo principal, se for diferente
CMD ["node", "index.js"]
# Usando imagem oficial do Node.js
FROM node:latest

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração e dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o restante do código
COPY . .

# Expõe a porta da aplicação
EXPOSE 3333

# Comando para iniciar a app
CMD ["npm", "start"]
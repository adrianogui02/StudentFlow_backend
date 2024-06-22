# Usar a imagem oficial do Node.js como base
FROM node:18

# Criar o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar as dependências usando yarn
RUN yarn install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta na qual a aplicação vai rodar
EXPOSE 3005

# Comando para iniciar a aplicação usando yarn
CMD ["yarn", "start"]

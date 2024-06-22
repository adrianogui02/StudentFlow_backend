# Usar a imagem oficial do Node.js como base
FROM node:18

# Criar o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos package.json e yarn.lock
COPY package.json yarn.lock ./

# Instalar as dependências usando yarn
RUN yarn install

# Baixar e instalar dockerize
RUN apt-get update && apt-get install -y wget \
    && wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.6.1.tar.gz \
    && rm dockerize-linux-amd64-v0.6.1.tar.gz

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta na qual a aplicação vai rodar
EXPOSE 3005

# Comando para iniciar a aplicação usando dockerize
CMD ["dockerize", "-wait", "tcp://db:5432", "-timeout", "30s", "yarn", "start"]

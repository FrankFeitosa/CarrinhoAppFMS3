# Passo a Passo para Configuração do Prisma

## 1. Instalar o Prisma
```sh
npm install prisma --save-dev
npm install @prisma/client
```

## 2. Inicializar o Prisma
```sh
npx prisma init
```

## 3. Configurar o `.env`
Edite o arquivo `.env` e defina a variável de ambiente:
```env
DATABASE_URL="postgresql://postgres:SENHA@localhost:5432/novo_banco?schema=public"
```

## 4. Testar a Conexão
```sh
npx prisma db pull
```

## 5. Criar seu Banco no Prisma
```sh
npx prisma migrate dev --name init
```

## 6. Testar as Requisições
Realize testes com os seguintes métodos HTTP:
- `POST`
- `PUT`
- `DELETE`

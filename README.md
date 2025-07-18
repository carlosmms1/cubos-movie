# Cubos Movie

<p align="center">
  <img src="./apps/frontend/public/preview.png" alt="Preview do Cubos Movie" style="max-width: 100%; border-radius: 8px;" />
</p>

## Resumo

O **Cubos Movie** é uma aplicação fullstack para cadastro, listagem e gerenciamento de filmes, com autenticação de usuários, upload de imagens, filtros avançados e integração com serviços externos (S3/MinIO para imagens, Mailhog para e-mails, PostgreSQL para banco de dados). O projeto utiliza:

- **Backend:** NestJS, Prisma ORM, PostgreSQL, Passport (JWT/Local), Docker Compose, Nodemailer, S3/MinIO
- **Frontend:** React, TanStack Router, Zustand, TanStack Query, React Hook Form, Zod, shadcn/ui

Funcionalidades principais:

- Cadastro e autenticação de usuários (com confirmação de e-mail)
- Cadastro, edição, deleção e listagem de filmes (com filtros e paginação)
- Upload seguro de imagens para S3/MinIO
- Proteção de rotas e permissões (apenas criador pode editar/deletar)
- Interface moderna, responsiva e com UX aprimorada

---

## Como executar o projeto

### 1. Pré-requisitos

- [Node.js 18+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### 2. Clonando o repositório

```sh
git clone https://github.com/carlosmms1/cubos-movie.git
cd cubos-movie
```

### 3. Subindo os serviços externos (Database, MinIO, Mailhog)

```sh
cd apps/backend
docker compose -f ./environment/docker-compose.yml up -d
```

Isso irá subir:

- PostgreSQL (banco de dados)
- MinIO (armazenamento de imagens)
- Mailhog (visualização de e-mails enviados)

### 4. Instalando dependências

```sh
pnpm install
```

### 5. Configurando as variáveis de ambiente

É necessário configurar as variáveis de ambiente corretamente para que o projeto funcione da melhor forma possível

#### Frontend (.env.example)

```
VITE_API_URL="http://localhost:3000"
```

#### Backend (.env.example)

```
DATABASE_URL="postgresql://cubos:cubos-pass@localhost:5432/cubos_movie?schema=public"
JWT_SECRET="my-super-long-secret-key"
JWT_TTL="1h"
SMTP_HOST="localhost"
SMTP_PORT=1025
S3_REGION="us-east-1"
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="my-access-key"
S3_SECRET_KEY="my-secret-key"
S3_BUCKET="my-bucket"
S3_PUBLIC_URL="http://localhost:9000"
```

### 6. Rodando as migrations do banco

```sh
cd apps/backend
pnpm prisma migrate deploy
```

### 7. Iniciando o backend

```sh
pnpm --filter backend dev
```

O backend estará disponível em `http://localhost:3333`.

### 8. Iniciando o frontend

```sh
pnpm --filter frontend dev
```

O frontend estará disponível em `http://localhost:5173`.

---

### 9. Iniciando toda a stack

#### Acesso o workspace para ter êxito

```sh
pnpm dev
```

O frontend e o backend estarão disponíveis nos endereços listados acima.

---

## Acessos úteis

- **Mailhog:** http://localhost:8025 (visualizar e-mails de confirmação)
- **MinIO:** http://localhost:9001 (login padrão: cubos/cubos-pass)
- **Banco de dados:** PostgreSQL em `localhost:5432` (usuário/senha padrão: cubos/cubos-pass)

---

## Observações

- O projeto utiliza autenticação JWT, sendo necessário login para acessar rotas protegidas.
- Apenas o criador do filme pode editar ou deletar o mesmo.
- O upload de imagens é feito para o MinIO em desenvolvimento (compatível com AWS S3 em produção).
- O envio de e-mails é simulado/local via Mailhog.

---

## Scripts úteis

- `pnpm prisma studio` — abrir interface visual do Prisma
- `pnpm prisma migrate dev` — rodar migrations em dev
- `pnpm prisma generate` — gerar client do Prisma
- `pnpm test` — rodar testes (quando implementados)

---

## Estrutura do projeto

- `apps/backend` — código do backend (NestJS)
- `apps/frontend` — código do frontend (React)
- `docker-compose.yml` — orquestração dos serviços externos

---

## Dúvidas?

Abra uma issue ou consulte a documentação interna dos módulos para detalhes de endpoints, exemplos de uso e padrões adotados.

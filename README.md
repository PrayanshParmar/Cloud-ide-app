### Setup

```bash
cd cloude_ide
docker-compose up -d
```

Once deployed you will need to copy the `.env.example` file to `.env` in order for Prisma to have a `DATABASE_URL` environment variable to access.

```bash
cp .env.example .env
```

You need turbo globally

```bash
yarn global add turbo
```

If you added a custom database name, or use a cloud based database, you will need to update the `DATABASE_URL` in your `.env` accordingly.

Once deployed & up & running, you will need to create & deploy migrations to your database to add the necessary tables.

```bash
turbo db:migrate:dev
```

If you need to push any existing migrations to the database, you can use either the Prisma db push or the Prisma migrate deploy command(s):

```bash
turbo db:push
```

### Build

To build all apps and packages, run the following command:

```bash
turbo build
```

### Develop

To develop all apps and packages, run the following command:

```bash
turbo dev
```

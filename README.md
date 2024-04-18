# cloudflare-d1-prisma-honox-starter

A starter project showing how you can integrate [Prisma](https://www.prisma.io) and [Cloudflare D1](https://developers.cloudflare.com/d1) with a [HonoX](https://github.com/honojs/honox) application to build awesome full-stack apps.

> [!TIP]
> If the above paragraph was a bunch of buzzwords that seem confusing, here's the simple version:
> 
> - HonoX is a _full-stack framework_ combining _backend API endpoints_ with the ability to render _frontend applications with React_
> - Cloudflare D1 is a _SQL database_
> - Prisma provides an _ORM wrapper_ around D1, to allow data models and querying using a straightforward syntax

## Installation

0. Clone the database and install all dependencies:

```sh
$ git clone https://github.com/kristianfreeman/cloudflare-d1-prisma-honox-starter starter
$ cd starter
$ npm install
```

1. Create a new D1 database using Wrangler:

```sh
$ npx wrangler@latest d1 create starter # or name it something of your choice
```

_Note that if you haven't yet used Wrangler, you will be prompted to login to Cloudflare._

Copy the output of this command, which is structured TOML configuration, into your `wrangler.toml`.

2. Create a new migration file using the `d1 migrations` subcommand:

```sh
$ npx wrangler d1 migrations create starter create_tables
```

3. Using Prisma's CLI, generate a SQL file based on your Prisma schema in the empty migration file you just created:

```sh
$ npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/0001_create_tables.sql
```

4. Generate the necessary Prisma files for Zod validations and any other configured Prisma outputs:

```sh
$ npx prisma generate
```

5. Apply the migration to your local database:

```sh
$ npx wrangler@latest d1 migrations apply cdph-starter
```

6. When you're ready, deploy your application:

```sh
$ npx wrangler@latest deploy
```

7. Once you've deployed your application, you can apply the migrations to your remote (production) D1 database:

```sh
$ npx wrangler@latest d1 migrations apply cdph-starter --remote
```

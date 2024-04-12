# THIS IS A WIP

npx wrangler@latest d1 create cdph-starter

npx wrangler d1 migrations create __YOUR_DATABASE_NAME__ create_tables

npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel ./prisma/schema.prisma \
  --script \
  --output migrations/0001_create_tables.sql

npx prisma generate

npx wrangler@latest d1 migrations apply cdph-starter

once deployed:

npx wrangler@latest d1 migrations apply cdph-starter --remote

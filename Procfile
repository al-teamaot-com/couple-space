release: npx prisma migrate deploy && psql $DATABASE_URL < tables.sql
web: NODE_ENV=production npm start 
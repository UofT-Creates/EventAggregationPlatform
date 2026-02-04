# Backend

This backend is built with Fastify. Please visit the [docs](https://fastify.dev/docs/latest/) for more information.

## Dev Setup

1. Run `npm i` to install the required dependencies.

2. Add a `.env` file with the following variable(s):

```ts
DATABASE_URL = "file:./dev.db";
```

3. Run the following [Prisma](https://www.prisma.io/docs/orm/reference/prisma-cli-reference) commands to set up a local DB with SQLite.
   1. `npx prisma generate` to generate the TS prisma client.
   2. `npx prisma migrate dev` to create/run migrations (create DB tables).
   3. `npx prisma db seed` to seed the local DB with sample data.
   4. (Optional) `npx prisma studio` to view your DB with an interactive UI.

4. Run `npm run dev` to start the server.

5. (Optional) As a sanity check, visit [localhost:3000/example-data](http://localhost:3000/example-data) to view the sample data returned from your db. You should see about 10 entries.

## Dev DB Setup Information

**SQLite** is used to create the dev DB. SQLite was selected for its minimal setup and its local storage of DB entries.

**Prisma** is used as an ORM to interact with the DB. Prisma was chosen for its wide popularity in the JS ecosystem and its high abstraction.

## Known Limitations

1. When executing `npm run dev`, the server starts and restarts again, all in quick succession. This doesn't seem to alter functionality, and it has minimal effect on DX.

2. The `tests` folder is not updated to reflect the new routes.

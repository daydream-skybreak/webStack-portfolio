# REST API of blog post APP

## Installation

To install the module, run

```sh
yarn add nodejs-blog
```

or

```sh
npm install nodejs-blog
```

For contributing to the development, fork the [GitHub repository](https://github.com/daydream-skybreak/webStack-portfolio.git).

## Configuration

*This part is not implemented in the code yet.*

To use the NodeJS Blog module, first, import the package

```js
const nodeBlog = require('nodejs-blog');
const { authors, auth, users, categories, articles } = require('nodejs-blog');
```

to start using the package, create a new blog object:

```js
const client = 'YOUR_DB_CLIENT'; // for more info, see https://knexjs.org/
const host = 'YOUR_DB_HOST';
const database = 'YOUR_DB_NAME';
const user = 'YOUR_DB_USER';
const pass = 'YOUR_DB_PASS';
const debug = true || false;
const blog = nodeBlog(client, host, user, database, password, debug);
```

For authentication you should set the following environment (`process.env.[variable] = value`) variables, or the auth methods will not work:
```
SALT_ROUNDS=number
JWT_SECRET=string
JWT_EXPIRES_IN_DAYS=number_of_days
```

Then you can use the imported functions as you wish, for example:

```js
const posts = await articles.list(blog);
```

Just send the `blog` instance as the first argument and the rest of the arguments second. This is because this way the same logic can be applied to multiple blog instances within an application.

The available methods are:

```js
authors.list(blog)
authors.get(blog, id)
authors.add(blog, authorObject)
authors.modify(blog, id, modifiedData)
authors.delete(blog, id)
auth.authenticate(blog, username, password) // Returns true/false
auth.generateToken(blog, username, password) // Returns JWT, throws error if invalid credentials
auth.decode(jwt) // Returns decoded object
auth.validate(blog, username, password) // Returns true/false
users.list(blog)
users.get(blog, id)
users.add(blog, userObject)
users.modify(blog, id, modifiedData)
users.delete(blog, id)
categories.list(blog)
categories.get(blog, id)
categories.add(blog, categoryObject)
categories.modify(blog, id, modifiedData)
categories.delete(blog, id)
articles.list(blog)
articles.get(blog, id)
articles.add(blog, articleObject)
// articles.modify(blog, id, modifiedData) // not available yet
articles.delete(blog, id)
```

## Running the API as a standalone service (still in development, might not work 100%)

First clone the repository and `cd` into the directory.

To run NodeJS Blog as a standalone service, run `cp .env.example .env` to create the `.env` file.

Set your database details and preferences in the `.env` file and run `yarn run start`.

The API documentation can be generated using SwaggerUI. The contents can be found in `./swagger.yml`.

For authentication, add a `Authorization` header, with a bearer token, following the `Bearer [jwt-token]` convention.

## Development

For development, the following commands are available:

| Command | Functionality |
| - | - |
| `yarn run dev` | Runs a `nodemon` server for the `server/server.js` file, and exposing the standalone service to your `localhost` |
| `yarn run cli` | Runs the CLI tool created for simple CRUD operations without accessing the database directly |
| `yarn run lint` | Runs ESLint, for PRs this should always pass |
| `yarn run test` | Runs Jest once, for PRs this should always pass. Your database must be available as it is used to run tests on (beware: all existing data will be wiped, we recommend using a separate test-database, this can be set in the `.env` file) |
| `yarn run test:watch` | Same as `yarn run test`, but it Jest watches for changes |
| `yarn run coverage` | Creates coverage report, for this the test database should also be available |
| `yarn run migrate` | Migrates your database (normal one, not test database) to the most recent migration, seeds will not be ran |
| `yarn run reinstall` | Deletes the `node_modules/` folder and reinstalls everything, if you get some stange dependency errors, run this command |
| `yarn run clean` | Deletes folders `build/`, `dist/` and `coverage/` |

### Node Environments

The following NodeJS Environments are integrated:

| Env | Effect |
| --- | ------ |
| development | Will add development headers, and improve logging experience |
| test | Will use test database, should only be used for automatic testing |

## Authors :black_nib:

Mulugeta Achiso Wodebo - [Linkedin](https://www.linkedin.com/in/mulugeta-wodebo-843118170) | [Twitter](https://twitter.com/anem_achiso) | [GitHub](https://github.com/Anemachiso)

Adonay Yitbarek - [Github](https://github.com/daydream-skybreak)

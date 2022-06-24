import express from 'express';
import { makeLogger } from './utils/makeLogger.js';
import './seed/index.js';
import { logRoute } from './middlewares/logRoute.js';
import routes from './routes/index.js';

const debug = makeLogger('server');

const app = express();
app.use(logRoute(debug));

const PORT = process.env.PORT || 3000;

const route = routes.find(([port]) => PORT === port);
if (!route) {
  throw new Error(`Don't know how to handle port ${PORT}`);
}
const [, router] = route;
app.use('/', router);

await app.listen(PORT);

debug.success(`Listening to http://localhost:${PORT}`);

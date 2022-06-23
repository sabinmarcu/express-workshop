import express from 'express';
import routes from './routes/index.js';
import { makeLogger } from './utils/makeLogger.js';
import './seed/index.js';
import { logRoute } from './middlewares/logRoute.js';

const debug = makeLogger('server');

const app = express();
app.use(logRoute(debug));

app.get('/', (req, res) => res.send('Hello World!'));

for (const [route, router] of routes) {
  debug.info(`Mounting ${route}`);
  app.use(route, router);
}

const PORT = process.env.PORT || 3000;

await app.listen(PORT);

debug.success(`Listening to http://localhost:${PORT}`);

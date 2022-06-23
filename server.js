import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));
app.post('/login', (req, res) => res.send('Login'));
// /echo?text=awesome => awesome
// /echo => 406
app.get('/echo', (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(406).send('There is no echo in the woods');
  }
  return res.send(text);
});

app.get('/ping', (req, res) => {
  const response = { pong: true };
  res.format({
    'text/plain': () => res.send(response),
    'text/html': () => res.send(`<h1 style="color:red">${JSON.stringify(response)}</h1>`),
    'application/json': () => res.json(response),
    default: () => res.status(406).send('Nope!'),
  });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.send(id);
});

const PORT = process.env.PORT || 3000;

await app.listen(PORT);

console.log(`Listening to http://localhost:${PORT}`);

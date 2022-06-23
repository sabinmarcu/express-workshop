import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 3000;

await app.listen(PORT);

console.log(`Listening to http://localhost:${PORT}`);

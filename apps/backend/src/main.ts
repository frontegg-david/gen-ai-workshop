import express from 'express';
import { test1 } from './test1';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();

app.get('/', async (req, res) => {

  const data = await test1(req.query['q'])
  res.send(data);
});

app.get('/users', async (req, res) => {

  const data = await test1(req.query['q'])
  res.send(data);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

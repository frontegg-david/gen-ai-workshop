import express from 'express';
import { test1 } from './test1';
import cors from 'cors'
import bodyParser from 'body-parser'
import { embedding } from './embeddings';
import { getDynamicOverviewBlocks } from './overview';
import { txtToCmd } from './commands';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json())



app.get('/users', async (req, res) => {
  const data = await test1(req.query['q'])
  res.send(data);
});


app.post('/ai', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await txtToCmd(res, req.body.cmd)

});

app.get('/ai', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await txtToCmd(res, (req.query as any)['cmd']!)

});


app.post('/overview', async (req, res) => {
  console.log('Get overview blocks')
  res.send(await getDynamicOverviewBlocks(req.body)).status(200);
});


app.get('/embeddings', async (req, res) => {
  res.send(await embedding());
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

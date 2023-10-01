import express from 'express';
import { test1 } from './test1';
import { runConversation } from './command';
import cors from 'cors'
import bodyParser from 'body-parser'
import { embedding } from './embeddings';
import { getDynamicOverviewBlocks } from './overview';


const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // replace with your client-side domain
}));
app.use(bodyParser.json())

app.get('/', async (req, res) => {

  res.send(await embedding());
  // const data = await test1(req.query['q'])
  // res.send(data);
});

app.get('/users', async (req, res) => {

  const data = await test1(req.query['q'])
  res.send(data);
});

app.post('/ai', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await runConversation(res, req.body.cmd)

});

app.get('/ai', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  await runConversation(res, (req.query as any)['cmd']!)

});


app.get('/user', async (req, res) => {

  const email = req.query['email']
  if (email === 'david@frontegg.com') {
    res.send({ id: '123123', 'name': 'David Antoon', 'email': 'david@frontegg.com' }).status(200);
  } else {
    res.send({ error: 'user not found' }).status(404);
  }
});


app.post('/overview', async (req, res) => {
  console.log('overview', req.body)
  res.send(await getDynamicOverviewBlocks(req.body)).status(200);
});


app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

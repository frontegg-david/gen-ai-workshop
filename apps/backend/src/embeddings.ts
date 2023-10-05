import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});


export async function generateEmbedding(input: string): Promise<Array<number>> {

  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input,
  });

  return embedding.data[0].embedding
}

export async function embedding() {
  const pinecone = new Pinecone({
    environment: 'gcp-starter',
    apiKey: '***************',
  });

  const index = pinecone.Index('flows');

  // const addNewUser = readFileSync(join(process.cwd(), 'apps/backend/src/assets/prompts/add-new-user.txt'), 'utf8')
  // const addBulkdOfUsers = readFileSync(join(process.cwd(), 'apps/backend/src/assets/prompts/add-bulk-of-user.txt'), 'utf8')
  // const texts = [
  //   addNewUser,
  //   addBulkdOfUsers
  // ]

  // for (const text of texts) {
  //   const embedding = await generateEmbedding(text);
  //   await index.upsert([ {
  //     id: uuid(),
  //     metadata: {
  //       text,
  //     },
  //     values: embedding
  //   } ]);
  // }
  const vector = await generateEmbedding('Add bulk users david+1@frontegg.com,aviad@frontegg.com');

  console.log(JSON.stringify(vector));
  const query = await index.query({
    topK: 3,
    vector,
    includeMetadata: true,
  })


  return query.matches.map(m => {
    console.log(m.score)
    return m.metadata.text
  })
}

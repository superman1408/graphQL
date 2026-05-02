import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// import { typeDefs } from './schema.js';
// import { resolvers } from './resolvers.js';


const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the GraphQL API server!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// import { typeDefs } from './schema.js';
// import { resolvers } from './resolvers.js';


const app = express();
const port = process.env.PORT || 4000;

// middleware setup for CORS and body parsing
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the GraphQL API server!');
});


// Server is running at http://localhost:4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


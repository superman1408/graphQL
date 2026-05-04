import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { TYPEDEFS } from './schema/schema.js';
import { RESOLVERS } from './resolvers/resolvers.js';


const app = express();
const port = process.env.PORT || 4000;


const server = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
});

// Start the Apollo Server and then apply the Express middleware for handling GraphQL requests. 
// This ensures that the server is ready before accepting requests.
await server.start().then(() => {
  console.log('Apollo Server is ready to handle GraphQL requests!');
});

// middleware setup for CORS and body parsing
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

// GraphQL endpoint setup with Apollo Server middleware for Express integration at /graphql
app.use('/graphql', expressMiddleware(server));



app.get('/', (req, res) => {
  res.send('Welcome to the GraphQL API server!');
});



// Server is running at http://localhost:4000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

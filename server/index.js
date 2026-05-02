import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name: 'Query',
      fields: {
          hello: {
              type: GraphQLString,
              resolve: () => 'Hello, world!'
          }
      }
  })
});

graphql({schema: schema, source: '{ hello }'}).then((response) => {
  console.log(response);
});

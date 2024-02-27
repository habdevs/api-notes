import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server-express';
import Comment from './models/comment.js';
import Post from './models/post.js';
import typeDefs from './schema.js';
import queryResolvers from './resolvers/query.js';
import mutationResolvers from './resolvers/mutation.js';

const uri =
  'mongodb+srv://ahramickih:TOEToCA84ap9a69X@api-posts.rlncm4z.mongodb.net/?retryWrites=true&w=majority&appName=api-posts';
const port = process.env.PORT || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query: queryResolvers.Query,
      Mutation: mutationResolvers.Mutation,
      
    },
    context: async ({ req }) => {
      // Добавление моделей в контекст
      return {
        models: {
          Post,
          Comment,
        },
        // user,
      };
    },
  });

  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: '/api' });

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen({ port }, () =>
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`,
    ),
  );
}

startApolloServer().catch(error => console.error(error));

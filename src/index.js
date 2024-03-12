import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit'
import { createComplexityLimitRule } from 'graphql-validation-complexity';
import { ApolloServer, gql } from 'apollo-server-express';
import Post from './models/post.js';
import User from './models/user.js';
import typeDefs from './schema.js';
import queryResolvers from './resolvers/query.js';
import mutationResolvers from './resolvers/mutation.js';
import jwt from 'jsonwebtoken';

const getUser = async token => {
  console.log('Token:', token);
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

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
    validationRules: [
      depthLimit(5),
      createComplexityLimitRule(1000, {
        on: 'QUERY',
      }),
    ],
    context: async ({ req }) => {
      const token = req.headers.authorization;
      const user = await getUser(token);
      console.log('USER', user)
      // Добавление моделей в контекст
      return {
        models: {
          Post,
          User
        },
        user
      };
    },
    introspection: true,
  });

  await server.start();

  const app = express();

  app.use(helmet());
  app.use(cors());

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

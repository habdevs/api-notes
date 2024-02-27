import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import Post from './models/post.js'; // Предполагается, что ваша модель находится в файле ./models/post.js

const uri =
  'mongodb+srv://ahramickih:TOEToCA84ap9a69X@api-posts.rlncm4z.mongodb.net/?retryWrites=true&w=majority&appName=api-posts';
const port = process.env.PORT || 4000;

async function startApolloServer() {
  const typeDefs = gql`
    type Post {
      id: ID!
      title: String!
      content: String!
      tags: String!
      author: String!
      createdAt: String
    }

    type Query {
      posts: [Post]
      post(id: ID!): Post
    }

    type Mutation {
      newPost(
        title: String!
        content: String!
        tags: String!
        author: String!
        createdAt: String
      ): Post
    }
  `;

  const resolvers = {
    Query: {
      posts: async () => {
        return await Post.find();
      },
      post: async (parent, args) => {
        return await Post.findById(args.id);
      },
    },
    Mutation: {
      newPost: async (parent, args) => {
        const newPost = new Post({
          title: args.title,
          content: args.content,
          tags: args.tags,
          author: args.author,
        });
        return await newPost.save();
      },
    },
  };
  
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  
  const app = express();
  server.applyMiddleware({ app, path: '/api' });
  
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.listen({ port }, () =>
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
  );
}

startApolloServer().catch(error => console.error(error));

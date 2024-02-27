import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import Post from './models/post.js';
import Comment from './models/comment.js'; // Предполагается, что ваша модель комментариев находится в файле ./models/comment.js

const uri =
  'mongodb+srv://ahramickih:TOEToCA84ap9a69X@api-posts.rlncm4z.mongodb.net/?retryWrites=true&w=majority&appName=api-posts';
const port = process.env.PORT || 4000;

async function startApolloServer() {
  const typeDefs = gql`
    type Comment {
      id: ID!
      text: String!
      author: String!
      date: String
      likes: Int
    }

    type Post {
      id: ID!
      title: String!
      content: String!
      tags: String!
      author: String!
      comments: [Comment]
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
      ): Post
      addComment(postId: ID!, text: String!, author: String!, user: String!): Post
    }
  `;

  const resolvers = {
    Query: {
      posts: async () => {
        return await Post.find().populate('comments');
      },
      post: async (parent, args) => {
        return await Post.findById(args.id).populate('comments');
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
      addComment: async (parent, args) => {
        const post = await Post.findById(args.postId);
        if (!post) {
          throw new Error('Post not found');
        }
        const newComment = new Comment({
          text: args.text,
          author: args.author,
          user: args.user,
        });
        post.comments.push(newComment);
        await newComment.save();
        return await post.save();
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
    console.log(
      `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`,
    ),
  );
}

startApolloServer().catch(error => console.error(error));

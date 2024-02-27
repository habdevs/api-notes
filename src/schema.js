import { gql } from 'apollo-server-express';

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
    updatePost(
      id: ID!
      content: String!
    ): Post
    deletePost(
      id: ID!
    ): Boolean
    addComment(
      postId: ID!
      text: String!
      author: String!
      user: String!
    ): Post
  }
`;

export default typeDefs;

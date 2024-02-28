import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar DateTime

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    tags: String
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
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
  }
`;

export default typeDefs;

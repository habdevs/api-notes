import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const port = process.env.PORT || 4000;

let notes = [
  {
    id: '1',
    content: 'This is a note',
    author: 'Bob Harley'
  },
  {
    id: '2',
    content: 'This is another note',
    author: 'Harlow Everly'
  },
  {
    id: '3',
    content: 'Oh hey look, another note!',
    author: 'Riley Harrison'
  }
];

const typeDefs = gql`
  type Note {
    id: ID
    content: String
    author: String
  }

  type Query {
    hello: String
		kek: String
    notes: [Note]
    note(id: ID): Note
  }

  type Mutation {
    newNote(content: String!, author: String!): Note
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
		kek: () => 'LOL kek',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id);
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: args.author 
      };
      notes.push(noteValue);
      return noteValue;
    }
  }
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
);

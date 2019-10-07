import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Video {
    name: String!
    file: String!
  }
  type Query {
    videos: [Video]
  }
  type Mutation {
    uploadTest(name: String!, file: String!): Video!
  }
`;

const videos = [
  {
    name: 'Testing',
    file: 'testing.mp4',
  },
];

const resolvers = {
  Query: {
    videos: () => videos,
  },
  Mutation: {
    uploadTest(parent, { name, file }) {
      videos.push({ name, file });
      return { name, file };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server started at ${url}`);
});

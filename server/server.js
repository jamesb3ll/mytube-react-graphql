import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { loadVideos, saveVideo } from './fileStore';

// Load video files when server boots and keep in-memory store
const videos = loadVideos();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    videos,
    saveVideo,
  },
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 1,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server started at ${url}`);
});

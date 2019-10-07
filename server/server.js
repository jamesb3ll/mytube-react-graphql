import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { loadVideos, saveVideo, UPLOAD_DIR } from './fileStore';

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

const app = express();

server.applyMiddleware({ app });

app.get('/uploads/:fileName', ({ params }, res) => {
  const { fileName } = params;
  return res.status(200).sendFile(fileName, {
    root: UPLOAD_DIR,
  });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server started at http://localhost:4000${server.graphqlPath}`)
);

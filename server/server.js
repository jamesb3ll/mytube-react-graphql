import { ApolloServer, gql, GraphQLUpload } from 'apollo-server';
import fs from 'fs';

const UPLOAD_DIR = __dirname + '/uploads';

const typeDefs = gql`
  type Video {
    name: String!
    file: String!
  }
  type Query {
    videos: [Video]
  }
  type Mutation {
    uploadVideo(name: String!, file: Upload!): Video!
  }
`;

// Load video files when server boots (No DB for video names, sorry! :))
const videos = fs
  .readdirSync(UPLOAD_DIR)
  .filter(file => !file.startsWith('.'))
  .map(file => {
    const [hash, name] = file.split('-');
    return {
      name,
      file: `${UPLOAD_DIR}/${file}`,
    };
  });

const saveVideo = (filename, stream) => {
  // naive random id implementation
  const id = Math.random()
    .toString(36)
    .slice(2);
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path }))
  );
};

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    videos: () => videos,
  },
  Mutation: {
    async uploadVideo(parent, { name, file }) {
      const { filename, mimetype, createReadStream } = await file;

      // Naive video format verification
      if (!mimetype.includes('video')) {
        throw new Error('Only video formats allowed.');
      }

      const stream = createReadStream();
      const { path } = await saveVideo(filename, stream);
      videos.push({ name, file: path });

      return { name, file: path };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 1,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server started at ${url}`);
});

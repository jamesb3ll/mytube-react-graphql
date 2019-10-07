import { GraphQLUpload } from 'apollo-server';

export default {
  Upload: GraphQLUpload,
  Query: {
    videos(parent, args, { videos }) {
      return videos;
    },
  },
  Mutation: {
    async uploadVideo(parent, { name, file }, { videos, saveVideo }) {
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

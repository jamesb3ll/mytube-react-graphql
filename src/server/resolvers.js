import { GraphQLUpload } from 'apollo-server-express';

export default {
  Upload: GraphQLUpload,
  Query: {
    videos(parent, args, { videos }) {
      return videos;
    },
  },
  Mutation: {
    async uploadVideo(parent, { name, file: upload }, { videos, saveVideo }) {
      const { filename, mimetype, createReadStream } = await upload;

      // Naive video format verification
      if (!mimetype.includes('video')) {
        throw new Error('Only video formats allowed.');
      }

      const stream = createReadStream();
      const { file } = await saveVideo(filename, stream);
      videos.push({ name, file });

      return { name, file };
    },
  },
};

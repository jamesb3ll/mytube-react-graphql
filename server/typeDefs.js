import { gql } from 'apollo-server';

export default gql`
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

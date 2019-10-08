import { createTestClient } from 'apollo-server-testing';
import { server } from '../server';
import { gql } from 'apollo-server-express';
import { createReadStream } from 'fs';

const GET_VIDEOS = gql`
  query {
    videos {
      name
      file
    }
  }
`;

const UPLOAD_VIDEO = gql`
  mutation uploadVideo($name: String!, $file: Upload!) {
    uploadVideo(name: $name, file: $file) {
      name
      file
    }
  }
`;

describe('Server', () => {
  let query, mutate, stop;

  beforeEach(async () => {
    const testServer = await createTestClient(server);
    query = testServer.query;
    mutate = testServer.mutate;
    stop = testServer.stop;
  });

  afterAll(() => stop());

  it('gets videos', async () => {
    const res = await query({ query: GET_VIDEOS });

    expect(res).toMatchSnapshot();
  });

  // Skipping: Testing file uploads requires building the request with FormData
  // https://github.com/jaydenseric/graphql-upload/issues/125
  it.skip('uploads videos', async () => {
    const file = createReadStream('./mockFiles/surf.mp4');

    const res = await mutate({
      query: UPLOAD_VIDEO,
      variables: {
        name: 'Test',
        file,
      },
    });

    expect(res).toMatchSnapshot();
  });
});

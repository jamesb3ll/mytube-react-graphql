import fs from 'fs';

export const UPLOAD_DIR = __dirname + '/uploads';

export function loadVideos() {
  return fs
    .readdirSync(UPLOAD_DIR)
    .filter(file => !file.startsWith('.'))
    .map((file, index) => {
      // Sorry... No DB for video names
      const [hash, name] = file.split('-');
      return {
        name: name || `Video ${index + 1}`,
        file: `${UPLOAD_DIR}/${file}`,
      };
    });
}

export function saveVideo(filename, stream) {
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
}

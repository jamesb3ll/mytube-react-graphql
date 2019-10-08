import fs from 'fs';

export const UPLOAD_DIR = __dirname + '/uploads/';

export function loadVideos() {
  return fs
    .readdirSync(UPLOAD_DIR)
    .filter(file => !file.startsWith('.'))
    .map((file, index) => {
      // Sorry... No DB for storing video names
      const [id, name] = file.split('-');
      return {
        name: name || `Video ${index + 1}`,
        file,
      };
    });
}

export function saveVideo(filename, stream) {
  // naive random id implementation
  const id = Math.random()
    .toString(36)
    .slice(2);
  const file = `${id}-${filename}`;
  const path = `${UPLOAD_DIR}/${file}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ path, file }))
  );
}

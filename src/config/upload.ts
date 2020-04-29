import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempoFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempoFolder,
  storage: multer.diskStorage({
    destination: tempoFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(8).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

import 'dotenv/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

const mkdir = (directory: string) => {
  try {
    fs.readdirSync(path.join(process.cwd(), directory));
  } catch (err) {
    console.log(
      `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
    );
    console.log(process.cwd());
    fs.mkdirSync(path.join(process.cwd(), directory));
  }
};

mkdir('uploads');

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads/');
      },
      filename(req: Request, file, done) {
        done(null,`${file.originalname}`);
      },
    }),
    // limits: { fileSize: 10 * 1024 * 1024 }
  };
};

export const createImageURL = (image: string): string => {
  const serverAddress: string = process.env.SERVER_URL;

  return `${serverAddress}/public/${image}`;
}
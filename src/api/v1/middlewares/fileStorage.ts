import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';

const storage = (folder: string, customName: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `./uploads/${folder}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const fileName = customName ? `${customName}${path.extname(file.originalname)}` : `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });
};

const upload = (folder: string, customName: string) => {
  return multer({
    storage: storage(folder, customName),
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });
};

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const filetypes = /jpeg|jpg|png|gif|svg|pdf|doc|docx|mp4|avi/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type!'));
  }
};

const saveFile = (folder: string, customName: string, req: Request, res: Response): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const uploadSingle = upload(folder, customName).single('file');
    uploadSingle(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      if (req.file) {
        resolve(`/uploads/${folder}/${req.file.filename}`);
      } else {
        resolve(null);
      }
    });
  });
};

const deleteFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const getFileUrl = (folder: string, filename: string): string => {
  return `/uploads/${folder}/${filename}`;
};

export default {
  saveFile,
  deleteFile,
  getFileUrl,
};
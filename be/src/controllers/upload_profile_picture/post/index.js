import { db } from "../../../db/index.js";
import { services } from "../../../services/index.js";
import multer from 'multer';


const allowedMimeTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPEG, JPG, and WEBP files are allowed'), false);
    }
  }
});

const uploadMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single('profile_picture')(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const post = async (req, res, next, io) => {
  const client = await db.psql.pool.connect();

  try {
    await client.query("BEGIN");

    await uploadMiddleware(req, res);

    if (!req.file) {
      await client.query("ROLLBACK");
      return res.status(400).json({ 
        success: false, 
        message: "No file uploaded or invalid file type" 
      });
    }

    const response = await services.upload_profile_picture({
      req, 
      client, 
      fileBuffer: req.file.buffer,
      io
    });

    await client.query("COMMIT");
    res.status(200).json(response);

  } catch (error) {
    console.error("Error handling profile picture POST request:", error);
    await client.query("ROLLBACK");
    
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: "Upload failed", 
        error: error.message 
      });
    }
  } finally {
    client.release();
  }
};
import multer from "multer";
import fs from "node:fs";
import path from "node:path";

const uploadDir = "uploads";

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, path.basename(uniqueName));
    }
});

export const upload = multer({ storage });
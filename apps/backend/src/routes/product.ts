import { Request, Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import multerS3 from "multer-s3";
import s3client from "../aws/S3";

const router: Router = Router();
// router.use(express.urlencoded({ extended: true }));

// const upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname + "-" + new Date().toISOString() + "-" + uuidv4());
    }
});

const multerS3Config = multerS3({
    s3: s3client,
    bucket: 'wallpaper-heaven',
    metadata: (req: Request, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + uuidv4() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: multerS3Config,
    limits: { fieldSize: 25 * 1024 * 1024 }
});

// add admin middleware
router.post("/add-product", upload.any(), (req, res) => {
    try {

        // 1. get all data
        // 2. process images
        // 3. upload to s3
        // 4. get the image link and store all to db

        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

export default router;
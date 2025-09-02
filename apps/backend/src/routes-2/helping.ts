import { Request, Response, Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { prisma } from "@repo/db";
import { adminMiddleware } from "../middleware/adminMiddleware";

const router: Router = Router();

// Ensure uploads directory exists
const uploadPath = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer disk storage for local uploads
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const filename = `${Date.now()}-${uuidv4()}-${file.originalname}`;
        callback(null, filename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }
});

// POST route
router.post("/add-help", upload.fields([{ name: "images", maxCount: 5 }]), async (req: Request, res: Response) => {
        try {
            const files = req.files as Record<string, Express.Multer.File[]>;

            if (!files || !files["images"] || files["images"].length === 0) {
                res.status(400).json({ message: "No images uploaded!" });
                return;
            }


            const imageURLs = files["images"].map(file =>
                path.join("uploads", file.filename) // Store relative path
            );

            // stringified data parsed
            const data = req.body.data;
            console.log(data);

            const parsedData = JSON.parse(data);
            const { name, description, creatorId, brandId, tags } = JSON.parse(parsedData);

            console.log(name);
            console.log(description);
            console.log(creatorId);
            console.log(brandId);
            console.log(tags);

            const adminId = req.adminId;

            if (!adminId) {
                res.status(401).json({ message: "You are not authorized" });
                return;
            }


            const tagIds = typeof tags === "string" ? [parseInt(tags)] : tags.map((id: string) => parseInt(id));

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    images: imageURLs,
                    addedAt: new Date(),
                    addedById: adminId,
                    creatorId: parseInt(creatorId),
                    brandId: parseInt(brandId),
                    tags: {
                        connect: tagIds.map((id: string) => ({ id }))
                    }
                }
            });


            res.status(200).json({
                message: "Product created successfully",
                product: newProduct
            });
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ 
                message: "Internal server error",
                error
            });
        }
    }
);

export default router;

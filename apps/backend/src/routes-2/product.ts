import { Router } from "express";
import { prisma } from "@repo/db";
import { deleteFile, multerS3Upload } from "../aws/S3FileManager";

const router: Router = Router();

const upload = multerS3Upload({
    folder: "products"
});

// add admin middleware here
router.post("/add-product", upload.fields([{ name: "images", maxCount: 5 }]), async (req, res) => {
    try {

        const files = req.files as Record<string, Express.Multer.File[]>;

        if (!files || !files["images"] || files["images"].length === 0) {
            res.status(400).json({
                message: "No files uploaded!"
            });
            return;
        }

        const imageURLs = files["images"].map(file => file.filename);

        const { name, description, tags, creatorId, brandId } = req.body;

        const id = req.adminId;

        if (!id) {
            res.status(401).json({
                message: "You are not authorized"
            });
            return;
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                images: imageURLs,
                addedAt: new Date().toISOString(),
                addedById: id,
                creatorId: parseInt(creatorId),
                brandId: parseInt(brandId),
                tags: tags
            }
        });

        if (!newProduct) {
            res.status(500).json({
                message: "Product creation failed due to internal server error"
            });
            return;
        }

        res.status(200).json({
            message: "Product created successfully"
        });
        return;


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.delete("/remove-product", async (req, res) => {
    try {

        const { id, name } = req.body;

        const product = await prisma.product.findUnique({
            where: {
                id: id,
                name: name
            }
        })

        if (!product) {
            res.status(402).json({ message: "Product not found" });
            return;
        }

        const existingProduct = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        if(!existingProduct) {
            res.status(402).json({
                message: "Product doesn't exist"
            });
            return;
        }

        const imageURLs = existingProduct.images;

        await prisma.product.delete({
            where: {
                id: id
            }
        })

        res.json({ message: "Product deleted successfully" });
        return;

        for(let image in imageURLs) {
            deleteFile(`products/${image}`);
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.put("/edit-product", upload.fields([{ name: "images", maxCount: 5 }]), async (req, res) => {
    try {

        const files = req.files as Record<string, Express.Multer.File[]>;

        if (!files || !files["images"] || files["images"].length === 0) {
            res.status(400).json({
                message: "No files uploaded!"
            });
            return;
        }

        const imageURLs = files["images"].map(file => file.filename);

        const { id, name, description, tags } = req.body;

        const updateProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                images: imageURLs,
                addedAt: new Date().toISOString(),
                addedById: id,
                tags: tags
            }
        })

        if(!updateProduct) {
            res.status(402).json({ message: "Product update failed" });
            return;
        }

        res.json({ message: "Product updated successfully" });
        return;

    } catch(error) {
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    }
});

router.put("/edit-product", (req, res) => {
    try {

        const { name, description, removedImages, newImages, brandId }: {
            name: string,
            description: string,
            removedImages: string[],
            newImages: string[],
            brandId: string
        } = req.body;

        

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

export default router;
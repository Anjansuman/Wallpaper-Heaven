import { Router } from "express";
import { deleteFile, multerS3Upload } from "../aws/S3FileManager";
import { prisma } from "@repo/db";

const router: Router = Router();

const upload = multerS3Upload({
    folder: "brands"
});

router.post("/add-brand", upload.fields([{ name: "images", maxCount: 1 }]), async (req, res) => {
    try {

        const file = req.file;

        // image is optional
        // if (!file) {
        //     res.status(400).json({
        //         message: "No images uploaded"
        //     });
        //     return;
        // }

        const data = JSON.parse(req.body);

        const { name, about, description } = data;

        const existingBrand = await prisma.brand.findUnique({
            where: {
                name: name
            }
        });

        if (existingBrand) {
            res.status(409).json({
                message: "Brand already exists"
            });
            return;
        }

        const newBrand = await prisma.brand.create({
            data: {
                name: name,
                about: about,
                description: description,
                image: file?.filename
            }
        });

        if (!newBrand) {
            res.status(500).json({
                message: "Brand creation failed due to internal server error"
            });
            return;
        }

        res.status(201).json({
            message: "Brand created successfully"
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.post("/remove-brand", async (req, res) => {
    try {

        const { id, name } = req.body;

        const existingBrand = await prisma.brand.findUnique({
            where: {
                id: id,
                name: name
            }
        });

        if(!existingBrand) {
            res.status(402).json({
                message: "Brand doesn't exist"
            });
            return;
        }

        const brandImage = existingBrand.image;

        await prisma.brand.delete({
            where: {
                id: id
            }
        });

        if(brandImage) {
            await deleteFile(`brands/${brandImage}`);
        }

        res.status(200).json({
            message: "Brand removed successfully"
        });
        return;
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

// to do
router.post("/edit-brand", upload.fields([{ name: "images", maxCount: 1 }]), async (req, res) => {
    try {

        const file = req.file;

        const { id, name, about, description } = req.body;

        const updatedBrand = await prisma.brand.update({
            where: {
                id: id
            },
            data: {
                name: name,
                about: about,
                description: description
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

export default router;
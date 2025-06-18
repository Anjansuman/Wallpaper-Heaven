import { Router } from "express";
import { deleteFile, multerS3Upload } from "../aws/S3FileManager";
import { prisma } from "@repo/db";

const router: Router = Router();

const upload = multerS3Upload({
    folder: "creators"
});

router.post("/add-creator", upload.fields([{ name: "images", maxCount: 1 }]), async (req, res) => {
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

        const newCreator = await prisma.creator.create({
            data: {
                name: name,
                about: about,
                description: description,
                image: file?.filename
            }
        });

        if (!newCreator) {
            res.status(500).json({
                message: "Creator creation failed due to internal server error"
            });
            return;
        }

        res.status(201).json({
            message: "Creator created successfully"
        });
        return;


    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

router.delete("/remove-creator", async (req, res) => {
    try {

        const { id, name } = req.body;

        const existingCreator = await prisma.creator.findUnique({
            where: {
                id: id,
                name: name
            }
        });

        if (!existingCreator) {
            res.status(402).json({
                message: "Creator doesn't exsist"
            });
            return;
        }

        const creatorImage = existingCreator.image;

        await prisma.creator.delete({
            where: {
                id: id
            }
        });

        if (creatorImage) {
            await deleteFile(`creators/${creatorImage}`);
        }
        res.status(200).json({
            message: "Creator removed successfully"
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
router.post("/edit-creator", upload.fields([{ name: "images", maxCount: 1 }]), async (req, res) => {
    try {

        const file = req.file;

        const data = JSON.parse(req.body);

        const { id, name, about, description, image } = data;

        const updatedCreator = await prisma.creator.update({
            where: {
                id: id
            }, 
            data: {
                name: name,
                about: about,
                description: description,
                image: file?.filename
            }
        })

        if(!updatedCreator) {
            res.status(402).json({ message: "Creator update failed" });
            return;
        }

        res.json({ message: "Creator updated successfully" });
        return;

        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
        return;
    }
});

export default router;
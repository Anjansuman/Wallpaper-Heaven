import multer from "multer";
import multerS3 from "multer-s3";
import s3client from "./S3";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

interface multerS3UploadProps {
    folder: string,
    limitedFieldSize?: number
}

// function for adding files to S#
export const multerS3Upload: ({
    folder,
    limitedFieldSize
}: multerS3UploadProps) => multer.Multer = ({
    folder,
    limitedFieldSize
}: multerS3UploadProps) => {
    return multer({
        storage: multerS3({
            s3: s3client,
            bucket: "wallpaper-heaven",
            metadata: (req: Request, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req: Request, file, cb) => {
                const fileName = `${new Date().toISOString()}-${uuidv4()}-${file.originalname}`;
                cb(null, `${folder}/${fileName}`);
            }
        }),
        limits: {
            fieldSize: limitedFieldSize || (20 * 1024 * 1024) // default 25MB
        }
    })
};

// function to delete files from S3
export const deleteFile: (key: string) => Promise<void> = async (key: string) => {
    try {

        const command = new DeleteObjectCommand({
            Bucket: "wallpaper-heaven",
            Key: key
        });

        await s3client.send(command);
        
    } catch (error) {
        // console.log("Error while deleting files", error);
    }
}
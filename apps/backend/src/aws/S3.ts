import { region, accessKeyId, secretAccessKey } from "@repo/secrets/aws";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";



const s3client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!
    }
});

export default s3client;
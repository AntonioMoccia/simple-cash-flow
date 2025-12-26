/* import {
  PutObjectCommand,
  S3Client,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "@lib/prisma-client";

export type GetSignedUrlParamsType = {
  size: number;
  contentType: string;
  filename: string;
};

class S3 {
  private static instance: S3; // <-- unica istanza della classe
  private s3Client: S3Client;

  private constructor() {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: "https://t3.storage.dev",
      forcePathStyle: false,
    });
  }

  public static getInstance(): S3 {
    if (!S3.instance) {
      S3.instance = new S3();
    }
    return S3.instance;
  }

  // Ritorna il client S3
  public getS3Client(): S3Client {
    return this.s3Client;
  }

  public async getSignedUrl(file: GetSignedUrlParamsType) {
    try {
      const { contentType, filename, size } = file;
      const s3Client = this.getS3Client();

      const uniqueKey = `${uuidv4()}-${filename}`;

      const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: uniqueKey,
        ContentType: contentType,
        ContentLength: size,
      });
      const presignedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 360,
      });
      const expireDate = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.tempImage.create({
        data: {
          expireAt: expireDate,
          key: uniqueKey,
          url: presignedUrl,
        },
      });

      return {
        presignedUrl,
        key: uniqueKey,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      });
      const deletedUrl = await this.getS3Client().send(command);
      if (key) {
        await prisma.tempImage.delete({
          where: {
            key: key,
          },
        });
      }
      return deletedUrl;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
      throw Error("Errore nell'eliminazione dell'immagine");
    }
  }
}

export default S3;
 */
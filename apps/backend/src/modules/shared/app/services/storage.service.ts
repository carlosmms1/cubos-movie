import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';

@Injectable()
export class StorageService {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('s3.region') ?? 'us-east-1',
      endpoint: this.configService.get<string>('s3.endpoint'),
      credentials: {
        accessKeyId: this.configService.get<string>('s3.accessKey'),
        secretAccessKey: this.configService.get<string>('s3.secretKey'),
      },
      forcePathStyle: true, // Required for MinIO
    });
    this.bucket = this.configService.get<string>('s3.bucket') ?? 'movies';
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${randomUUID()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    const endpoint =
      this.configService.get<string>('s3.publicUrl') ??
      this.s3.config.endpoint.toString();
    return `${endpoint}/${this.bucket}/${fileName}`;
  }
}

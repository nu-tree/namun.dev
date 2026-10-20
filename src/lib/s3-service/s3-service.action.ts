'use server';

import { S3Service } from './s3-service.server';

export async function getSignedUploadUrl(key: string, directory?: string) {
  return await S3Service.getSignedPutUrl(key, directory);
}

export async function deleteS3File(key: string) {
  return await S3Service.deleteFile(key);
}

export async function moveS3FileToDeleted(key: string) {
  return await S3Service.moveToDeleted(key);
}

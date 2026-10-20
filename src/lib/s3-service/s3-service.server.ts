import 'server-only';
import { CopyObjectCommand, DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Config = {
  accountId: process.env.S3_ACCOUNT_ID!,
  accessKeyId: process.env.S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  bucketName: process.env.S3_BUCKET_NAME!,
  objectUrl: process.env.NEXT_PUBLIC_R2_OBJECT_DOMAIN!,
};

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${s3Config.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: s3Config.accessKeyId,
    secretAccessKey: s3Config.secretAccessKey,
  },
});

export class S3Service {
  static async getSignedPutUrl(key: string, directory?: string) {
    const directoryPrefix = directory ? `${directory}/` : '';
    const uploadedKey = `${directoryPrefix}${Date.now()}-${key}`;
    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: uploadedKey,
    });

    return {
      uploadUrl: await getSignedUrl(s3, command),
      uploadedUrl: `${s3Config.objectUrl}/${uploadedKey}`,
    };
  }

  static async deleteFile(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    const res = await s3.send(command);

    return {
      ok: res.$metadata.httpStatusCode === 204,
    };
  }

  // 파일을 deleted 폴더(휴지통)로 이동
  static async moveToDeleted(key: string) {
    try {
      // 휴지통(deleted/) 폴더로 이동할 새 경로
      const deletedKey = `deleted/${key}`;

      // 원본 파일을 휴지통 폴더로 복사
      await s3.send(
        new CopyObjectCommand({
          Bucket: s3Config.bucketName,
          CopySource: `${s3Config.bucketName}/${key}`,
          Key: deletedKey,
        }),
      );

      // 복사 성공 시 원본 파일 삭제
      await s3.send(
        new DeleteObjectCommand({
          Bucket: s3Config.bucketName,
          Key: key,
        }),
      );

      // 성공적으로 복사 및 삭제 완료
      return { ok: true, deletedKey };
    } catch (err: any) {
      // 휴지통으로 이동할 원본 파일이 존재하지 않을 경우
      if (err.name === 'NoSuchKey') return { ok: false, reason: 'not_found' };

      // 기타 AWS SDK 예외 처리
      return { ok: false, reason: 'unknown_error', error: err.message };
    }
  }
}

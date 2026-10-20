import { getSignedUploadUrl } from '@/lib/s3-service/s3-service.action';

// 단일 파일 업로드
export const uploadFileOne = async (file?: File | string | null, directory?: string): Promise<string> => {
  if (!file) return '';
  if (typeof file === 'string') return file;

  // .hwp, hwpx 파일은 타입 직접 지정
  if (file.name.endsWith('.hwp') || file.name.endsWith('.hwpx')) {
    file = new File([file], file.name, { type: 'application/octet-stream' });
  }

  if (!file.type) {
    throw new Error(`${file.name} 파일은 유효하지 않습니다.`);
  }

  // File 인스턴스인 경우 업로드
  const { uploadUrl, uploadedUrl } = await getSignedUploadUrl(file.name, directory);

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!response.ok) {
    throw new Error('파일 업로드 중 에러 발생');
  }

  return uploadedUrl;
};

// 다중 파일 업로드
export const uploadS3Files = async (
  file?: File | string | (File | string)[] | null,
  directory?: string,
): Promise<string[]> => {
  if (!file) return [];

  const fileList = Array.isArray(file) ? file : [file];
  if (fileList.length === 0) return [];

  const urls = await Promise.all(fileList.map((file) => uploadFileOne(file, directory)));
  return urls;
};

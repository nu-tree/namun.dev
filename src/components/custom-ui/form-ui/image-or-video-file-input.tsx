'use client';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Image from 'next/image';
import { cn } from '@/lib/utils/utils';

type FileInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  isImageOnly?: boolean;
  showFileName?: boolean;
  directory?: string;
  directoryFieldName?: string;
  description?: string;
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export const ImageOrVideoFileInput = ({
  name,
  label,
  placeholder = '이미지 파일을 선택하거나\n드래그하여 업로드해주세요',
  className,
  isImageOnly = true,
  showFileName = true,
  directory,
  directoryFieldName = 'directory',
  disabled,
  description,
  ...props
}: FileInputProps) => {
  const form = useFormContext();
  const [isDragOver, setIsDragOver] = useState(false);
  const [displayName, setDisplayName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentFile = useWatch({
    control: form.control,
    name,
  });

  // 폼 값 변경 시 표시명 업데이트
  useEffect(() => {
    if (currentFile instanceof File) {
      setDisplayName(currentFile.name);
      // File 객체인 경우 미리보기 URL 생성
      const url = URL.createObjectURL(currentFile);
      setPreviewUrl(url);
      // 메모리 누수 방지를 위한 cleanup
      return () => URL.revokeObjectURL(url);
    } else if (typeof currentFile === 'string' && currentFile) {
      // URL에서 파일명 추출
      const urlParts = currentFile.split('/');
      const fileName = urlParts[urlParts.length - 1].split('-')[1];
      setDisplayName(fileName || '기존 이미지');
      // 기존 URL을 미리보기로 사용
      setPreviewUrl(currentFile);
    } else {
      setDisplayName('');
      setPreviewUrl('');
    }
  }, [currentFile]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setDisplayName(file.name);
      form.setValue(name, file);
      // directory가 제공된 경우 form에 저장
      if (directory && directoryFieldName) {
        form.setValue(directoryFieldName as any, directory);
      }
    } else {
      setDisplayName('');
      form.setValue(name, null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        handleFileChange(file);
      }
    }
  };

  const handleClick = () => {
    disabled ? null : fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const isExistingUrl = typeof currentFile === 'string' && currentFile;

  return (
    <div>
      <FormField
        control={form.control}
        name={name as any}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormControl>
              <div className="w-full">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={isImageOnly ? 'image/*' : 'image/*,video/*'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  id="file-drop"
                  className={cn(
                    `flex h-40 w-60 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 p-2 transition-colors ${isDragOver ? 'border-gray-500 bg-gray-50' : 'border-gray-200 hover:border-gray-400'} ${displayName ? 'border-1 border-solid' : 'border-dashed'} `,
                    disabled ? 'cursor-not-allowed opacity-50' : '',
                  )}
                >
                  {displayName ? (
                    <div className="flex h-full w-full flex-col items-center justify-center text-center">
                      {/* 이미지 미리보기 */}
                      {previewUrl && (
                        <div className="mb-2 flex w-full max-w-full items-center justify-center overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="미리보기"
                            className="h-auto max-h-30 w-auto max-w-full rounded object-contain"
                            onError={() => setPreviewUrl('')} // 이미지 로드 실패시 미리보기 숨김
                            width={300}
                            height={300}
                          />
                        </div>
                      )}
                      {showFileName && <p className="text-sm font-medium text-gray-700">{displayName}</p>}
                      <p className="mt-1 text-xs text-gray-500">
                        {isExistingUrl ? '기존 파일 (클릭하여 변경)' : '클릭하여 다른 파일 선택'}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm whitespace-pre-line text-gray-600">{placeholder}</p>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

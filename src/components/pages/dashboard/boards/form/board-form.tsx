'use client';

import {
  TextInput,
  NumberInput,
  SelectInput,
  FormButtons,
  CheckboxInput,
  InputWrap,
  CheckboxGroupInput,
} from '@/components/custom-ui/form-ui/form-input';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { BoardFormSchema } from './board-form-schema';
import { useBoardFormSubmit } from '@/hooks/api/board/use-board-form-submit';
import { useBoardOne } from '@/hooks/api/board/use-board-one';
import { BoardRoleOptions } from '@/constants/board-role';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FileCog, Image, Paperclip, Shield } from 'lucide-react';

export default function BoardForm() {
  const { id: stringId } = useParams<{ id: string }>();
  const [previewSize, setPreviewSize] = useState<Record<string, number | undefined>>({
    width: undefined,
    height: undefined,
  });
  const { data, isLoading } = useBoardOne(stringId || '');
  const { handleSubmit, isPending } = useBoardFormSubmit(stringId);

  const form = useForm<BoardFormSchema>({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      feature: {
        role: {
          edit: 'admin',
          read: 'guest',
          delete: 'admin',
          comment: 'user',
        },
        secret: {
          passwordRequired: false,
        },
        captcha: false,
        thumbnail: {
          width: 0,
          height: 0,
        },
        attachment: {
          maxCount: 0,
          maxSize: 0,
          allowTypes: [''],
        },
      },
    },
  });
  useEffect(() => {
    if (data && !isLoading && stringId) {
      form.reset(data);
      // 썸네일이 있으면 isThumbAble 체크
      if (data.feature.thumbnail && (data.feature.thumbnail.width || data.feature.thumbnail.height)) {
        form.setValue('isThumbAble', true);
      } else {
        form.setValue('isThumbAble', false);
      }
      // 첨부파일이 있으면 isAttachAble 체크
      if (data.feature.attachment && (data.feature.attachment.maxCount || data.feature.attachment.maxSize)) {
        form.setValue('isAttachAble', true);
      } else {
        form.setValue('isAttachAble', false);
      }
    }
  }, [data, isLoading, stringId, form]);

  const isAttachAble = useWatch({ name: 'isAttachAble', control: form.control });

  useEffect(() => {
    // 첨부파일 사용 선택시 기본값 세팅
    if (
      isAttachAble &&
      !form.getValues('feature.attachment.maxCount') &&
      !form.getValues('feature.attachment.maxSize')
    ) {
      form.setValue('feature.attachment', {
        maxCount: 1,
        maxSize: 30,
        allowTypes: [
          'zip,rar,7z,tar,gz',
          'jpg,jpeg,png,gif,webp,svg,bmp,tiff,raw,heif',
          'pdf,docx,doc,hwp,hwpx,pptx,ppt,xls,xslx,txt',
        ],
      });
    }
  }, [isAttachAble, form]);

  const isThumbAble = useWatch({ name: 'isThumbAble', control: form.control });
  const thumbWidth = useWatch({ name: 'feature.thumbnail.width', control: form.control });
  const thumbHeight = useWatch({ name: 'feature.thumbnail.height', control: form.control });

  const handleClickPreview = () => {
    setPreviewSize({ width: thumbWidth || 0, height: thumbHeight || 0 });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CommonForm
      handleSubmit={handleSubmit}
      formInstance={form}
      className="flex flex-col gap-6 space-y-0 lg:grid lg:grid-cols-2"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2 text-lg">
            <FileCog className="size-5 text-orange-400" />
            <span>기본 설정</span>
          </CardTitle>
          <CardDescription>게시판의 기본 정보를 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputWrap>
            <CheckboxInput schema={BoardFormSchema} name="feature.secret.passwordRequired" label="비밀번호 사용" />
            <CheckboxInput schema={BoardFormSchema} name="feature.captcha" label="CAPTCHA 사용" />
          </InputWrap>
          <TextInput
            schema={BoardFormSchema}
            name="slug"
            label="게시판 ID"
            placeholder="ex) notice, free"
            description="영문자, 숫자, 밑줄(_)만 입력 가능"
          />
          <TextInput
            schema={BoardFormSchema}
            name="title"
            label="게시판 제목"
            description="사용자에게 노출되는 제목"
            placeholder="ex) 공지사항, 자유게시판"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2 text-lg">
            <Shield className="text-primary size-5" />
            <span>권한 설정</span>
          </CardTitle>
          <CardDescription>게시판의 권한을 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputWrap>
            <SelectInput
              schema={BoardFormSchema}
              description="게시글 등록 및 편집 권한"
              name="feature.role.edit"
              label="등록/편집 권한"
              options={BoardRoleOptions}
              className="[&_button]:w-35"
            />
            <SelectInput
              schema={BoardFormSchema}
              description="게시글 삭제 권한"
              name="feature.role.delete"
              label="삭제 권한"
              options={BoardRoleOptions}
              className="[&_button]:w-35"
            />
          </InputWrap>
          <InputWrap>
            <SelectInput
              description="게시글 읽기 권한"
              schema={BoardFormSchema}
              name="feature.role.read"
              label="읽기 권한"
              options={BoardRoleOptions}
              className="[&_button]:w-35"
            />
            <SelectInput
              description="게시글 댓글 등록 권한"
              schema={BoardFormSchema}
              name="feature.role.comment"
              label="댓글 달기 권한"
              options={BoardRoleOptions}
              className="[&_button]:w-35"
            />
          </InputWrap>
        </CardContent>
      </Card>
      <Card className={isAttachAble ? '' : 'h-25 overflow-hidden'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 text-lg">
              <Paperclip className="size-5 text-stone-400" />
              <span>첨부파일 설정</span>
            </div>
            <CheckboxInput schema={BoardFormSchema} name="isAttachAble" label="첨부파일 사용" />
          </CardTitle>
          <CardDescription>게시글 작성시 첨부할 수 있는 파일을 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <InputWrap>
            <NumberInput
              schema={BoardFormSchema}
              disabled={!isAttachAble}
              name="feature.attachment.maxCount"
              label="최대 개수"
              description="미 입력시 제한 없음"
              placeholder="0~10"
              min={0}
              max={10}
            />
            <NumberInput
              schema={BoardFormSchema}
              disabled={!isAttachAble}
              name="feature.attachment.maxSize"
              label="개당 최대 용량(MB)"
              description="미 입력시 제한 없음"
              placeholder="최소 0"
              min={0}
            />
          </InputWrap>
          <CheckboxGroupInput
            schema={BoardFormSchema}
            label="허용 타입"
            name="feature.attachment.allowTypes"
            disabled={!isAttachAble}
            isAllVisible={true}
            options={[
              { value: 'zip,rar,7z,tar,gz', label: '압축 파일', description: 'zip, rar 등 ' },
              {
                value: 'jpg,jpeg,png,gif,webp,svg,bmp,tiff,raw,heif',
                label: '이미지 파일',
                description: 'jpg, png, gif 등',
              },
              {
                value: 'pdf,docx,doc,hwp,hwpx,pptx,ppt,xls,xslx,txt',
                label: '문서 파일',
                description: 'doc, hwp, pdf, xlsx, pptx 등',
              },
            ]}
          />
        </CardContent>
      </Card>
      {/* <NumberInput name="feature.comment.maxDepth" label="댓글 최대 깊이" placeholder="ex) 3" /> */}
      <Card className={isThumbAble ? '' : 'h-25 overflow-hidden'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 text-lg">
              <Image className="size-5 text-purple-500" />
              <span>썸네일 설정</span>
            </div>
            <CheckboxInput schema={BoardFormSchema} name="isThumbAble" label="썸네일 사용" className="" />
          </CardTitle>
          <CardDescription>게시글 목록에 표시될 썸네일을 설정합니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-end gap-x-3">
            <InputWrap>
              <NumberInput
                schema={BoardFormSchema}
                name="feature.thumbnail.width"
                label="너비(px)"
                placeholder="ex) 120"
                disabled={!isThumbAble}
              />
              <NumberInput
                schema={BoardFormSchema}
                name="feature.thumbnail.height"
                label="높이(px)"
                placeholder="ex) 80"
                disabled={!isThumbAble}
              />
            </InputWrap>
            <Button
              type="button"
              variant="outline"
              onClick={handleClickPreview}
              disabled={!isThumbAble}
              className="h-9"
            >
              미리보기
            </Button>
          </div>
          {isThumbAble && previewSize.width && previewSize.height && (
            <div>
              <FormLabel>썸네일 미리보기</FormLabel>
              <div
                className="mt-2 flex max-w-full items-center justify-center bg-gray-200"
                style={{
                  width: previewSize.width || 0,
                  aspectRatio:
                    previewSize.width && previewSize.height ? previewSize.width / previewSize.height : undefined,
                }}
              >
                {`${previewSize.width} x ${previewSize.height} (px)`}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <FormButtons buttonName="게시판" isEditMode={!!stringId} isLoading={isPending} className="mt-0 col-start-2" />
    </CommonForm>
  );
}

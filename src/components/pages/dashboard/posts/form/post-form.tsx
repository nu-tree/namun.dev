'use client';

import {
  TextInput,
  SelectInput,
  FormButtons,
  CheckboxInput,
  TipTapInput,
  InputWrap,
} from '@/components/custom-ui/form-ui/form-input';
import { CommentsTable } from './comments-table-input';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { orUndefined } from '@/lib/utils/utils';
import { useBoardSlugList } from '@/hooks/api/board/use-board-slug-list';
import { usePostOne } from '@/hooks/api/post/use-post-one';
import { PostFormSchema } from './post-form-schema';
import { usePostFormSubmit } from '@/hooks/api/post/use-post-form-submit';
import { ImageOrVideoFileInput } from '@/components/custom-ui/form-ui/image-or-video-file-input';
import { FileInput } from '@/components/custom-ui/form-ui/file-input';

export const PostForm = ({ id }: { id?: string }) => {
  const { data: slugData, isLoading: isSlugLoading } = useBoardSlugList();
  const { data, isLoading } = usePostOne(id || '');
  const slugOptions = slugData?.data.map((board) => ({ label: board.title, value: board.id })) || [];

  const form = useForm<PostFormSchema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: {
      isDraft: false,
      isSecret: false,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        thumbnail: orUndefined(data.thumbnail),
      });
    }
  }, [data]);

  const { handleSubmit, isPending } = usePostFormSubmit(id);

  // 첨부파일 처리(파일이 한개일 경우에는 배열로 감싸기)
  const attachments = useWatch({
    control: form.control,
    name: 'attachments',
  });
  useEffect(() => {
    if (attachments && attachments instanceof File && !Array.isArray(attachments)) {
      form.setValue('attachments', [attachments]);
    }
  }, [attachments, form]);

  // 첨부파일 설정 반영
  const boardId = useWatch({
    control: form.control,
    name: 'boardId',
  });
  const selectedBoard = slugData?.data?.find((board) => board.id === boardId);
  const fileConfig = selectedBoard?.feature?.attachment;
  const thumbnailConfig = !!selectedBoard?.feature?.thumbnail?.width;

  if (isLoading || isSlugLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CommonForm handleSubmit={handleSubmit} className="space-y-4" formInstance={form}>
      <InputWrap>
        <CheckboxInput schema={PostFormSchema} name="isDraft" label="임시저장" />
        <CheckboxInput schema={PostFormSchema} name="isSecret" label="비밀글" />
      </InputWrap>
      <SelectInput
        schema={PostFormSchema}
        name="boardId"
        label="게시판"
        options={slugOptions}
        className="[&_button]:w-50"
      />
      {selectedBoard?.feature?.secret?.passwordRequired && (
        <TextInput schema={PostFormSchema} name="password" label="비밀번호" placeholder="비밀번호" />
      )}
      <TextInput schema={PostFormSchema} name="title" label="게시글 제목" placeholder="게시글 제목" />
      <TipTapInput schema={PostFormSchema} keyId="content" name="content" label="게시글 내용" />
      {fileConfig && (
        <FileInput
          schema={PostFormSchema}
          name="attachments"
          label="첨부 파일"
          multiple={fileConfig.maxCount ? fileConfig.maxCount > 1 : false}
          maxCount={fileConfig.maxCount}
          maxSize={fileConfig.maxSize}
          allowTypes={fileConfig.allowTypes ? fileConfig.allowTypes.join(',').toLowerCase().split(',') : []}
        />
      )}
      {thumbnailConfig && <ImageOrVideoFileInput name="thumbnail" label="썸네일" placeholder="썸네일" />}
      {/* {id && (
        <div className="grid gap-2">
          <div className="text-[14px] font-medium">댓글</div>
          <CommentsTable userOptions={userOpt || dummyOpt} isLoading={isLoading} />
        </div>
      )} */}
      <FormButtons buttonName="게시물" isLoading={isPending} />
    </CommonForm>
  );
};

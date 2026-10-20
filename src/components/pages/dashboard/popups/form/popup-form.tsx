'use client';

import { PopupFormSchema } from './popup-form-schema';
import {
  TextInput,
  NumberInput,
  DateInput,
  SelectInput,
  FormButtons,
  InputWrap,
} from '@/components/custom-ui/form-ui/form-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { usePopupFormSubmit } from '@/hooks/api/popup/use-popup-form-submit';
import { usePopupOne } from '@/hooks/api/popup/use-popup-one';
import {
  POPUP_DISPLAY_TYPE_OPTIONS,
  POPUP_POSITION_TYPE_OPTIONS,
  POPUP_SIZE_TYPE_OPTIONS,
} from '@/lib/constants/popup-constants';
import { ImageOrVideoFileInput } from '@/components/custom-ui/form-ui/image-or-video-file-input';
import { format, formatDate } from 'date-fns';

export const PopupForm = ({ id }: { id?: string }) => {
  const { data, isLoading } = usePopupOne(id || '');
  const { handleSubmit, isPending } = usePopupFormSubmit(id);

  const form = useForm<PopupFormSchema>({
    resolver: zodResolver(PopupFormSchema),
    defaultValues: {
      startDate: format(new Date(), 'yyyy-MM-dd'),
      displayType: 'ALL',
      positionType: 'TOP_LEFT',
      sizeType: 'MEDIUM',
      displayOrder: 1,
    },
  });

  useEffect(() => {
    if (data && id) {
      form.reset({
        ...data,
        linkUrl: data.linkUrl || '',
        displayPages: data.displayPages || '',
        startDate: formatDate(new Date(data.startDate), 'yyyy-MM-dd'),
        endDate: data.endDate ? formatDate(new Date(data.endDate), 'yyyy-MM-dd') : '',
      });
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form}>
      <TextInput schema={PopupFormSchema} name="identifier" label="팝업 ID" placeholder="main-1" />
      <ImageOrVideoFileInput name="content" label="팝업 이미지" />
      <TextInput
        schema={PopupFormSchema}
        name="linkUrl"
        label="링크 URL"
        placeholder="팝업 클릭시 이동할 주소(www.google.com)"
      />
      <NumberInput
        schema={PopupFormSchema}
        name="displayOrder"
        label="노출 순서"
        placeholder="0"
        description="숫자가 높을수록 우선적으로 표시됩니다."
      />
      <InputWrap>
        <DateInput isString canSelectPast={false} schema={PopupFormSchema} name="startDate" label="노출 시작일" />
        <DateInput isString canSelectPast={false} schema={PopupFormSchema} name="endDate" label="노출 종료일" />
      </InputWrap>
      {/* NOTE: 위치 및 크기 픽셀로 지정하는 기능 보류 */}
      {/* <InputWrap>
        <NumberInput schema={PopupFormSchema} name="topPosition" label="상단 위치 픽셀" placeholder="0" />
        <NumberInput schema={PopupFormSchema} name="leftPosition" label="왼쪽 위치 픽셀" placeholder="0" />
      </InputWrap>
      <InputWrap>
        <NumberInput schema={PopupFormSchema} name="width" label="가로 크기 픽셀" placeholder="0" />
        <NumberInput schema={PopupFormSchema} name="height" label="세로 크기 픽셀" placeholder="0" />
      </InputWrap> */}
      <TextInput
        schema={PopupFormSchema}
        name="displayPages"
        label="노출 페이지"
        placeholder="쉼표로 구분(/url,/url2)"
        description="미지정시 메인페이지에만 노출됩니다."
      />
      <InputWrap>
        <SelectInput
          schema={PopupFormSchema}
          name="displayType"
          label="표시 기기"
          options={POPUP_DISPLAY_TYPE_OPTIONS}
          className="[&_button]:!w-full"
        />
        <SelectInput
          schema={PopupFormSchema}
          name="positionType"
          label="표시 위치"
          options={POPUP_POSITION_TYPE_OPTIONS}
          className="[&_button]:!w-full"
        />
      </InputWrap>
      <InputWrap>
        <SelectInput
          schema={PopupFormSchema}
          name="sizeType"
          label="팝업 너비"
          description="소형 360px / 중형 600px / 대형 800px"
          options={POPUP_SIZE_TYPE_OPTIONS}
          className="[&_button]:!w-full"
        />
      </InputWrap>
      <FormButtons buttonName="팝업" isEditMode={!!id} isLoading={isPending} />
    </CommonForm>
  );
};

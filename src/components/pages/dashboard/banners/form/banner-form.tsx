'use client';

import {
  TextInput,
  NumberInput,
  CheckboxInput,
  InputWrap,
  FormButtons,
} from '@/components/custom-ui/form-ui/form-input';
import { BannerFormSchema } from './banner-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useBannerFormSubmit } from '@/hooks/api/banner/use-banner-form-submit';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { useBannerOne } from '@/hooks/api/banner/use-banner-one';
import { Card, CardContent } from '@/components/ui/card';
import BannersItemsList from './banners-items-list';

const units = [
  { label: 'PC', value: 'PC' },
  { label: 'MOBILE', value: 'MOBILE' },
  { label: 'ALL', value: 'ALL' },
];

export default function BannerForm({ id }: { id?: string }) {
  const { data, isLoading } = useBannerOne(id || '');
  const form = useForm<BannerFormSchema>({
    resolver: zodResolver(BannerFormSchema),
    defaultValues: {
      isView: true,
      bannerWidth: 100,
      bannerHeight: 100,
    },
  });
  const { handleSubmit, isPending } = useBannerFormSubmit(id || '');

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        bannerItems: data?.bannerItems?.map((item) => ({
          ...item,
          imageUrl: item.imageUrl,
          startDate: new Date(item.startDate),
          endDate: item.endDate ? new Date(item.endDate) : undefined,
        })),
      });
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CommonForm handleSubmit={handleSubmit} className="space-y-4 max-w-xl" formInstance={form}>
      <Card>
        <CardContent className="space-y-7">
          <CheckboxInput schema={BannerFormSchema} name="isView" label="배너 노출" />
          <TextInput schema={BannerFormSchema} name="slug" label="식별자" placeholder="식별자" autoFocus />
          <InputWrap>
            <NumberInput
              schema={BannerFormSchema}
              name="bannerWidth"
              label="배너 가로 길이"
              placeholder="배너 가로 길이"
            />
            <NumberInput
              schema={BannerFormSchema}
              name="bannerHeight"
              label="배너 세로 길이"
              placeholder="배너 세로 길이"
            />
          </InputWrap>
        </CardContent>
      </Card>
      <BannersItemsList id={id} isPending={isPending} />
      <FormButtons buttonName="배너" isEditMode={!!id} isLoading={isPending} />
    </CommonForm>
  );
}

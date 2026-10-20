'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/custom/use-toast';
import { useEffect } from 'react';
import { SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';
import { useSiteSettingOne } from '@/hooks/api/site-setting/use-site-setting-one';
import { useSiteSettingUpdate } from '@/hooks/api/site-setting/use-site-setting-update';
import { SiteSettingFormSchema } from './site-setting-form-schema';
import { uploadFileOne } from '@/lib/s3-service/s3-uploader';
import { ImageOrVideoFileInput } from '@/components/custom-ui/form-ui/image-or-video-file-input';
import { SiteSettingFormConfig } from './site-setting-form';
import { Spinner } from '@/components/ui/spinner/spinner';

type Props = React.HTMLAttributes<HTMLElement> & {
  settingKey: SiteSettingKeyType;
};

export const SiteSettingImageForm = ({ settingKey }: Props) => {
  const toast = useToast();
  const { data, isLoading } = useSiteSettingOne(settingKey);
  const { mutateAsync, isPending } = useSiteSettingUpdate();

  const form = useForm<SiteSettingFormSchema>({
    resolver: zodResolver(SiteSettingFormSchema),
    defaultValues: {
      key: settingKey,
      value: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        key: settingKey,
        value: data.value || '',
      });
    }
  }, [data, settingKey]);

  const handleSubmit = async (formData: SiteSettingFormSchema) => {
    const fileUrl = await uploadFileOne(formData.value);
    const submitData = {
      ...formData,
      value: fileUrl,
    };

    const res = await mutateAsync(submitData);
    if (res.ok) {
      toast.success('저장되었습니다.');
    } else {
      toast.error('저장에 실패했습니다.');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CommonForm handleSubmit={handleSubmit} formInstance={form} className="space-y-2">
      <ImageOrVideoFileInput
        name="value"
        label={SiteSettingFormConfig[settingKey].label}
        description={SiteSettingFormConfig[settingKey].desc}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? '저장중...' : '저장'}
      </Button>
    </CommonForm>
  );
};

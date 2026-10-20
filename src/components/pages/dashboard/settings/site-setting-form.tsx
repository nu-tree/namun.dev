'use client';

import { cn } from '@/lib/utils/utils';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CommonForm } from '@/components/custom-ui/form-ui/common-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/custom/use-toast';
import { useEffect } from 'react';
import { SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';
import { UpdateSiteSettingSchema } from '@/lib/hono/api/service/site-setting/schema/update-site-setting.schema';
import { useSiteSettingOne } from '@/hooks/api/site-setting/use-site-setting-one';
import { useSiteSettingUpdate } from '@/hooks/api/site-setting/use-site-setting-update';
import { Spinner } from '@/components/ui/spinner/spinner';
import { Textarea } from '@/components/ui/textarea';

type Props = React.HTMLAttributes<HTMLElement> & {
  settingKey: SiteSettingKeyType;
};

type ConfigType = {
  label: string;
  placeholder: string;
  type?: string;
  desc?: string;
};

export const SiteSettingFormConfig: Record<SiteSettingKeyType, ConfigType> = {
  analytics_google: {
    label: '구글 애널리틱스 ID',
    placeholder: 'ex) G-000000000-0',
  },
  gtm_google: {
    label: '구글 태그 매니저 ID',
    placeholder: 'ex) GTM-000000000',
  },
  analytics_naver: {
    label: '네이버 애널리틱스 ID',
    placeholder: 'ex) 000000000',
  },
  naver_site_verification: {
    label: '네이버 서치어드바이저 사이트 소유확인 ID',
    placeholder: '네이버 서치어드바이저에서 제공하는 메타태그의 content값',
  },
  seo_site_name: {
    label: '이름',
    placeholder: '사이트 이름을 입력하세요',
    desc: '웹사이트의 타이틀로, 검색 엔진 결과에 표시됩니다. 60자 이내로 입력하는 것이 좋습니다.',
  },
  seo_site_description: {
    label: '설명',
    placeholder: '사이트 설명을 입력하세요',
    type: 'textarea',
    desc: '웹사이트의 설명으로, 검색 엔진 결과에 표시됩니다. 160자 이내로 입력하는 것이 좋습니다.',
  },
  seo_site_keywords: {
    label: '키워드',
    placeholder: '키워드를 쉼표로 구분하여 입력하세요',
    desc: '웹사이트와 관련된 키워드로, 해당 키워드로 검색시 웹사이트가 노출될 수 있습니다. ex) 쇼핑몰, 공모전, 전자제품',
  },
  favicon_image: {
    label: '파비콘 이미지',
    placeholder: '파비콘 이미지 url을 입력해주세요.',
    desc: '브라우저 탭에 표시되는 작은 아이콘입니다. 32x32 권장',
    type: 'file',
  },
  seo_site_image: {
    label: 'OG 이미지',
    placeholder: 'og이미지 url을 입력해주세요.',
    desc: '소셜 미디어에서 공유될 때 표시되는 이미지의 URL입니다. 1200x630 권장',
    type: 'file',
  },
  seo_og_description: {
    label: 'OG 설명',
    placeholder: 'OG 설명을 입력하세요',
    type: 'textarea',
    desc: '소셜 미디어에서 공유될 때 표시되는 설명입니다. 160자 이내로 입력하는 것이 좋습니다.',
  },
};
/** 텍스트용 폼  */
export const SiteSettingForm = ({ className, settingKey }: Props) => {
  const toast = useToast();
  const { data, isLoading } = useSiteSettingOne(settingKey);
  const { mutateAsync, isPending } = useSiteSettingUpdate();

  const form = useForm<UpdateSiteSettingSchema>({
    resolver: zodResolver(UpdateSiteSettingSchema),
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

  const handleSubmit = async (formData: UpdateSiteSettingSchema) => {
    const res = await mutateAsync(formData);
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
    <CommonForm className={cn('space-y-2', className)} handleSubmit={handleSubmit} formInstance={form}>
      <SiteSettingFormField settingKey={settingKey} />
      <Button size="sm" type="submit" disabled={isPending}>
        {isPending ? '저장중...' : '저장'}
      </Button>
    </CommonForm>
  );
};

const SiteSettingFormField = ({ settingKey }: Props) => {
  const form = useFormContext<UpdateSiteSettingSchema>();
  const config = SiteSettingFormConfig[settingKey];

  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel className="whitespace-nowrap">{config.label}</FormLabel>
          {config.desc && <FormDescription>{config.desc}</FormDescription>}
          <FormControl>
            <div>
              {config.type === 'textarea' ? (
                <Textarea {...field} placeholder={config.placeholder} className="w-100" />
              ) : (
                <Input {...field} placeholder={config.placeholder} className="w-100" />
              )}
              <FormMessage />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

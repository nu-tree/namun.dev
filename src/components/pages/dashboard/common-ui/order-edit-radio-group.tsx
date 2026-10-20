'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Skeleton } from '@/components/ui/skeleton';
import { useSiteSettingOne } from '@/hooks/api/site-setting/use-site-setting-one';
import { useSiteSettingUpdate } from '@/hooks/api/site-setting/use-site-setting-update';
import { SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';

export default function OrderEditRadioGroup({ settingKey }: { settingKey: SiteSettingKeyType }) {
  const { mutateAsync, isPending } = useSiteSettingUpdate();
  const { data, isLoading } = useSiteSettingOne(settingKey);

  const handleChange = async (value: string) => {
    //TODO: 에러 핸들링, site setting 스키마 수정/타입 지정
    const res = await mutateAsync({ key: settingKey, value });
    if (res.ok) {
      console.log('정렬 기준이 저장되었습니다:', value);
    } else {
      console.error('정렬 기준 저장 실패:', res.error);
    }
  };

  if (isLoading) {
    return <Skeleton className="w-full h-5 mb-4" />;
  }

  return (
    <div className="flex items-center gap-x-5 mb-4">
      <RadioGroup
        defaultValue={data?.value || 'latest'}
        onValueChange={(value) => handleChange(value)}
        className="grid-cols-[70px_70px]"
      >
        <div className="flex items-center gap-1">
          <RadioGroupItem value="latest" id="r2" className="bg-white" />
          <Label htmlFor="r2">최신순</Label>
        </div>
        <div className="flex items-center gap-1">
          <RadioGroupItem value="popular" id="r3" className="bg-white" />
          <Label htmlFor="r3">인기순</Label>
        </div>
      </RadioGroup>
      <div className="text-sm text-gray-600">조회 순서 설정시 사용자 페이지에도 반영됩니다.</div>
    </div>
  );
}

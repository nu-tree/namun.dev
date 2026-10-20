'use client';

import {
  SelectInput,
  FormButtons,
  InputWrap,
  NumberInput,
  DateInput,
  TextInput,
} from '@/components/custom-ui/form-ui/form-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { asyncConfirm } from '@/components/custom-ui/designed-confirm/designed-confirm.hook';
import { ImageOrVideoFileInput } from '@/components/custom-ui/form-ui/image-or-video-file-input';
import { BannerFormSchema } from './banner-form-schema';
import { useEffect } from 'react';

const units = [
  { label: '모든 기기', value: 'ALL' },
  { label: '컴퓨터', value: 'PC' },
  { label: '모바일', value: 'MOBILE' },
];

export default function BannersItemsList({ id, isPending = false }: { id?: string; isPending: boolean }) {
  const form = useFormContext<BannerFormSchema>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'bannerItems',
  });

  const addBannerItem = () => {
    append(
      {
        displayOrder: 0,
        displayType: 'ALL',
        startDate: new Date(),
        endDate: undefined,
        imageUrl: '',
        linkUrl: '',
      },
      { shouldFocus: false },
    );
  };

  const removeBanner = async (index: number) => {
    const confirmed = await asyncConfirm('삭제하시겠습니까?', { buttonText: '삭제' });
    if (!confirmed) return;
    remove(index);
  };

  useEffect(() => {}, []);

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        return (
          <Card key={field.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>배너 아이템 #{index + 1}</span>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeBanner(index)}>
                  <Trash2 className="size-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <NumberInput
                schema={BannerFormSchema}
                name={`bannerItems.${index}.displayOrder`}
                label="노출 순서"
                placeholder="숫자만 입력해주세요. 미 입력시 무작위로 노출됩니다"
              />
              <TextInput
                schema={BannerFormSchema}
                name={`bannerItems.${index}.linkUrl`}
                label="URL"
                placeholder="클릭시 이동할 URL"
              />
              <SelectInput
                schema={BannerFormSchema}
                name={`bannerItems.${index}.displayType`}
                label="노출 기기"
                options={units}
                className="[&_button]:w-53"
              />
              <InputWrap>
                <DateInput
                  schema={BannerFormSchema}
                  name={`bannerItems.${index}.startDate`}
                  label="노출 시작 날짜"
                  placeholder="날짜를 선택해주세요"
                  required
                  canSelectPast={false}
                />
                <DateInput
                  schema={BannerFormSchema}
                  isResetable
                  name={`bannerItems.${index}.endDate`}
                  label="노출 끝 날짜"
                  placeholder="미 지정시 영구 노출됩니다"
                  canSelectPast={false}
                />
              </InputWrap>
              <InputWrap>
                <ImageOrVideoFileInput
                  name={`bannerItems.${index}.imageUrl`}
                  label="배너 이미지/영상"
                  placeholder={'이미지 또는 동영상 파일을\n업로드해주세요'}
                />
              </InputWrap>
            </CardContent>
          </Card>
        );
      })}

      <Button type="button" onClick={() => addBannerItem()} variant="outline" className="w-full">
        <Plus className="mr-1 size-4" />
        배너 아이템 추가
      </Button>
    </div>
  );
}

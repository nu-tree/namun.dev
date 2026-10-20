'use client';

import {
  DetailCard,
  DetailSection,
  DetailFieldGrid,
  DetailField,
  DetailSeparator,
  DetailFieldList,
} from '@/components/pages/dashboard/common-ui/detail-card';
import { useInquiryOne } from '@/hooks/api/inquiry/use-inquiry-one';
import { format } from 'date-fns';

type InquiryDetailViewProps = {
  inquiryId: string;
};

export function InquiryDetailView({ inquiryId }: InquiryDetailViewProps) {
  const { data, isLoading, error } = useInquiryOne(inquiryId);

  return (
    <DetailCard loading={isLoading} error={error ? '문의를 찾을 수 없습니다.' : null} className="pt-0">
      {data && (
        <>
          {/* 기본 정보 섹션 */}
          <DetailSection>
            <DetailFieldGrid columns={2}>
              <DetailField label="게시판" value={data.inquiryMeta?.title || '-'} />
              <DetailField label="연락처" value={data.contact || '-'} />
              <DetailField label="비밀글 여부" value={data.isSecret ? '비밀글' : '공개글'} />
              <DetailField
                label="작성일"
                value={data.createdAt ? format(new Date(data.createdAt), 'yyyy.MM.dd HH:mm') : '-'}
              />
            </DetailFieldGrid>
          </DetailSection>

          <DetailSeparator />

          {/* 문의 내용 섹션 */}
          <DetailSection>
            <DetailFieldList>
              <DetailField label="제목" value={data.title || '-'} />
              <DetailField
                label="내용"
                value={
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg whitespace-pre-wrap">
                    {data.content || '내용이 없습니다.'}
                  </div>
                }
              />
            </DetailFieldList>
          </DetailSection>
        </>
      )}
    </DetailCard>
  );
}

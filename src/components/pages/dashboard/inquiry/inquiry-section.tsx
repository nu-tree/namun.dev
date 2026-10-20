'use client';

import ManageList from '@/components/layout/dashboard/manage-list';
import { InquiryTable } from './inquiry-table';
import { MultiValueFilter } from '../common-ui/search-wrapper';
import { useInquiryMetaList } from '@/hooks/api/inquiry-meta/use-inquiry-meta-list';

const searchOptions = [
  { value: 'title', label: '문의 제목' },
  { value: 'contact', label: '연락처' },
];

export const InquirySection = () => {
  const { data } = useInquiryMetaList();
  const slugOptions = data?.data.length
    ? data?.data?.map((item) => ({ value: item.id, label: item.title }))
    : [{ value: 'null', label: '문의 게시판 없음' }];

  return (
    <ManageList
      titleName="1:1문의"
      placeholderExample={['문의 제목', '연락처']}
      tableNode={<InquiryTable />}
      searchOptions={searchOptions}
      searchNode={[
        <MultiValueFilter key="inquiryMetaId" queryKey="inquiryMetaId" options={slugOptions} />,
        <MultiValueFilter
          key="isAnswered"
          queryKey="isAnswered"
          options={[
            { value: 'true', label: '답변 완료' },
            { value: 'false', label: '미답변' },
          ]}
        />,
      ]}
    />
  );
};

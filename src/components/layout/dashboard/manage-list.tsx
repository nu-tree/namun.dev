import React from 'react';
import { ButtonsWrapper, ToAddPageButton } from '@/components/pages/dashboard/common-ui/buttons-wrapper';
import {
  FilterGroupSeperator,
  FilterWrapper,
  SearchByQueryProvider,
  SearchContentWrapper,
  SearchParamsSearchBar,
} from '@/components/pages/dashboard/common-ui/search-wrapper';
import { PageWrapper, PageWrapperHeader, PageWrapperTitle } from '@/components/pages/dashboard/common-ui/page-wrapper';
import OrderEditRadioGroup from '@/components/pages/dashboard/common-ui/order-edit-radio-group';
import { SiteSettingKeyType } from '@/lib/hono/api/service/site-setting/schema/site-setting.schema';

type PageProps = {
  titleName: string;
  placeholderExample: string[];
  tableNode: React.ReactNode;
  searchOptions: { value: string; label: string }[];
  searchNode?: React.ReactNode;
  url?: string;
  isSortEditable?: boolean;
  sortSettingKey?: SiteSettingKeyType;
};

export default function ManageList({
  titleName,
  placeholderExample,
  tableNode,
  searchOptions,
  searchNode,
  url,
  isSortEditable = false,
  sortSettingKey,
}: PageProps) {
  const children = React.Children.toArray(searchNode);

  return (
    <PageWrapper>
      <SearchByQueryProvider>
        <PageWrapperHeader>
          <PageWrapperTitle>{titleName}관리</PageWrapperTitle>
          <ButtonsWrapper>
            {url && <ToAddPageButton href={`/admin/${url}/add`}>{titleName} 추가</ToAddPageButton>}
          </ButtonsWrapper>
        </PageWrapperHeader>

        <SearchContentWrapper title={`${titleName} 검색`}>
          <SearchParamsSearchBar
            options={searchOptions}
            placeholder={`검색어를 입력하세요${placeholderExample && ` (예: ${placeholderExample.join(', ')})`}`}
          />

          {children && children.length > 0 ? (
            <FilterWrapper>
              {children.length <= 1
                ? children
                : children.map((child, index) => (
                    <React.Fragment key={index}>
                      {child}
                      {index < children.length - 1 && <FilterGroupSeperator />}
                    </React.Fragment>
                  ))}
            </FilterWrapper>
          ) : null}
        </SearchContentWrapper>

        <div className={isSortEditable ? '' : 'border rounded-md overflow-hidden bg-card'}>
          {isSortEditable && sortSettingKey ? (
            <div>
              <OrderEditRadioGroup settingKey={sortSettingKey} />
              <div className="border rounded-md overflow-hidden bg-card">{tableNode}</div>
            </div>
          ) : (
            tableNode
          )}
        </div>
      </SearchByQueryProvider>
    </PageWrapper>
  );
}

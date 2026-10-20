import InquiryForm from '@/components/pages/platform/sub-page/inquiry/Inquiry-form';

type PageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params }: PageProps) {
  return (
    <section>
      <InquiryForm />
    </section>
  );
}

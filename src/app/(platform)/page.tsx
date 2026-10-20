type PageProps = {
  params: Promise<{ [key: string]: string | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  return <section></section>;
}

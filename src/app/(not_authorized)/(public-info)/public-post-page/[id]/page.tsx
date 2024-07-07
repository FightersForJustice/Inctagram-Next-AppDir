import ProfileServer from '@/app/(not_authorized)/(public-info)/public-post-page/[id]/ProfileServer/ProfileServer';

const Page = async ({ params }: { params: { id: string } }) => {
    console.log(params.id)
  return (
    <>
      <ProfileServer id={+params.id} myProfile={false} isPublic />
    </>
  );
};

export default Page;

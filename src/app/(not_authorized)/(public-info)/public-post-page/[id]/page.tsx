import ProfileServer from '@/app/(authorized)/profile/[id]/ProfileServer/ProfileServer';

const Page = async ({ params }: { params: { id: string } }) => {
    console.log(params.id)
  return (
    <>
      <ProfileServer id={+params.id} myProfile={false} isPublic />
    </>
  );
};

export default Page;

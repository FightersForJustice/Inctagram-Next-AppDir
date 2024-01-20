// Loading animation

function FormItemSkeleton() {
  return (
    <div className="overflow-hidden w-full rounded-[2px] flex flex-col shadow-sm">
      <div className="animate-pulse h-[14px] w-[200px] bg-neutral-800 my-[5px] rounded-[2px]" />
      <div className="animate-pulse h-[38px] bg-neutral-800 rounded-[2px]" />
    </div>
  );
}

function FormAboutMeSkeleton() {
  return (
    <div className="overflow-hidden w-full rounded-[2px] flex flex-col shadow-sm">
      <div className="animate-pulse h-[14px] w-[200px] bg-neutral-800 my-[5px] rounded-[2px]" />
      <div className="animate-pulse h-[84px] bg-neutral-800 rounded-[2px] mb-[4px]" />
    </div>
  );
}

function CitySelectorsSkeleton() {
  return (
    <div className="flex gap-[24px] sm:flex-row flex-col">
      <FormItemSkeleton />
      <FormItemSkeleton />
    </div>
  );
}

function LineSkeleton() {
  return <div className=" animate-pulse h-[2px] bg-neutral-800" />;
}

function SubmitBtnSkeleton() {
  return (
    <div className="flex flex-row-reverse lg:pb-[0px] pb-[60px]">
      <div className="animate-pulse w-[134px] h-[38px] rounded-[2px] bg-neutral-800" />
    </div>
  );
}

export function ProfileSettingsFormSkeleton() {
  return (
    <div className="flex flex-1 flex-col my-[24px] gap-[24px]">
      <FormItemSkeleton />
      <FormItemSkeleton />
      <FormItemSkeleton />
      <FormItemSkeleton />
      <CitySelectorsSkeleton />
      <FormAboutMeSkeleton />
      <LineSkeleton />
      <SubmitBtnSkeleton />
    </div>
  );
}

export function AvatarSkeleton() {
  return (
    <div className="flex flex-col gap-[24px] items-center ">
      <div className="animate-pulse w-[192px] h-[192px] rounded-full  bg-neutral-800" />
      <div className="animate-pulse w-full sm:w-[160px] h-[38px] rounded-[2px] bg-neutral-800" />
    </div>
  );
}

export function ProfileSettingsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-[40px] w-full">
      <div className="mt-[25px] md:mt-[50px]">
        <AvatarSkeleton />
      </div>
      <ProfileSettingsFormSkeleton />
    </div>
  );
}

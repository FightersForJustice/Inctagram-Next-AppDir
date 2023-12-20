import Image from 'next/image';

type GetServiceType = {
  onClick: () => void;
  img: string;
  alt: string;
};

const GetService = ({ onClick, img, alt }: GetServiceType) => {
  return (
    <Image
      onClick={onClick}
      className={'cursor-pointer'}
      src={img}
      alt={alt}
      width={36}
      height={36}
    />
  );
};

export default GetService;

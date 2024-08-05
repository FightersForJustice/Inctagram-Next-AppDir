import Providers from '@/helpers/hocs/Providers';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { cookies } from 'next/headers';
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import { Metadata } from 'next';
import s from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  //CMS metadata here or hardcode Meta

  const title = "Inctagram";
  const description =
    "Welcome to Inctagram, the premier destination for visual storytelling and creative expression. Discover a vibrant community where you can share your life's moments through photos and videos. Connect with friends, explore engaging content from around the world, and uncover new interests. Join Inctagram today to start capturing, sharing, and enjoying moments that matter.";
  const keywords =
    "Inctagram, Social Media Platform, Photo Sharing App, Video Sharing, Online Community, Visual Storytelling, Creative Expression, Connect with Friends, Explore New Interests, Discover Content, Photo Filters, Live Streaming, Mobile Photography, Social Networking, Engage with Content";
  const ogLink = "https://inctagramm.vercel.app/";
  const ogImage = "/img/OGimage.png" || "";
  const ogSite = "Inctagram";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: ogLink,
      siteName: ogSite,
      images: [
        {
          url: ogImage,
          width: 1090,
          height: 506,
          alt: "Inctagram",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      site: "Inctagram",
      creator: "Inctagram",
      title: title,
      description: description,
      images: ogImage,
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const lang = cookies().get('userLanguage')?.value || 'en';


  return (
    <html lang={lang}>
    <body>
    <div className={s.layoutWrapper}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Providers lang={lang}>
        <div className={clsx(inter.className)}>{children}</div>
      </Providers>
      <div id="portal" />
    </div>
    </body>
    </html>
  );
}

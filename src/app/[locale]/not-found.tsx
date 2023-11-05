'use client';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';

export default function NotFoundPage() {
  return (
    <BaseLayout>
      <>NOT FOUND</>
    </BaseLayout>
  );
}

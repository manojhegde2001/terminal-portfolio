'use client';

import dynamic from 'next/dynamic';

const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-screen w-full bg-gray-900">
      <Terminal />
    </main>
  );
}

'use client';

import Image from 'next/image';

import CustomLink from './custom-link';
import React from 'react';
import { Button } from './ui/button';

export function MainNav() {
  return (
    <div className="flex gap-4 items-center">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          <Image
            src="/logo.png"
            alt="Home"
            className="w-auto h-6"
            width={0}
            height={0}
            sizes="100vw"
          />
        </Button>
      </CustomLink>
    </div>
  );
}

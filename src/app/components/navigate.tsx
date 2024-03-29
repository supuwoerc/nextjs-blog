'use client';
import classNames from 'classnames';
import { Page, Post } from 'contentlayer/generated';
import { isUndefined } from 'lodash-es';
import { BookOpenCheck, Loader, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SwitchTheme from './switchTheme';

const sizes = {
  width: 32,
  height: 32,
};
export interface NavigateProps {
  post?: Post | Page;
}
const nav = [
  { path: '/', name: 'Home' },
  { path: '/blog', name: 'Blog' },
  { path: '/about', name: 'About' },
];
const Navigate: React.FC<NavigateProps> = ({ post }) => {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const props = {
    className: 'hover:cursor-pointer',
    size: 18,
  };
  const isDetail = isUndefined(post);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={classNames('select-none', {
        'flex items-baseline justify-between': isDetail,
      })}
    >
      {isDetail ? (
        <>
          <Link href={'/'}>
            <Image
              src={'/imgs/logo.svg'}
              alt="logo"
              {...sizes}
              priority={true}
            />
          </Link>
          <div className="flex items-center justify-between gap-[12px]">
            {nav.map(({ path, name }) => {
              return (
                <Link
                  key={name}
                  href={path}
                  className={classNames(
                    'transition-colors duration-300 dark:text-white ',
                    {
                      'realistic-marker-highlight': path === pathname,
                    }
                  )}
                >
                  {name}
                </Link>
              );
            })}
            {mounted ? <SwitchTheme /> : <Loader {...props} />}
          </div>
        </>
      ) : (
        <div className="prose dark:prose-invert">
          <h2 className="mb-[10px] pt-[20px]">{post.title}</h2>
          <div className="">
            {post.desc && (
              <p className="text-slate-700 dark:text-slate-200 my-0">
                {`${post.desc}`}
              </p>
            )}
            <p className="my-0 flex items-baseline text-[14px]">
              <span className="mr-6 flex items-center">
                <Send size={14} style={{ marginRight: 4 }} />
                {post.publishDate}
              </span>
              <span className="flex items-center">
                <BookOpenCheck size={14} style={{ marginRight: 4 }} />
                {post.readingTime.text}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigate;

'use client';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import { useEffect, useRef } from 'react';
gsap.registerPlugin(TextPlugin);
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to('.title', {
        duration: 1,
        text: 'zhangqimeng.fun',
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={ref}
      className="blur-text border-red relative h-full w-full overflow-y-auto"
    >
      <div className="mx-auto max-w-2xl">
        <div className="relative mx-auto">
          <article className="prose relative mx-auto py-4 text-black dark:prose-invert dark:text-white">
            <h2 className="title"></h2>
          </article>
        </div>
      </div>
    </div>
  );
}

'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { MouseEvent } from 'react';

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const isAppearanceTransition =
      // @ts-expect-error experimental API
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAppearanceTransition) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }
    const { clientX: x, clientY: y } = event;
    const largerRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${largerRadius}px at ${x}px ${y}px)`,
    ];
    // @ts-expect-error
    const transition = document.startViewTransition(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: !isDarkMode ? clipPath : [...clipPath].reverse(),
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          // 指定要附加动画的伪元素
          pseudoElement: !isDarkMode
            ? '::view-transition-new(root)'
            : '::view-transition-old(root)',
        }
      );
    });
  };
  const props = {
    className: 'hover:cursor-pointer w-[18px]',
  };
  return (
    <button className="p-1" onClick={onClick}>
      {isDarkMode ? <Moon {...props} /> : <Sun {...props} />}
    </button>
  );
}

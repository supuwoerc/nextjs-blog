"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Loader } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Post } from "contentlayer/generated";
import { isUndefined } from "lodash-es";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const sizes = {
  width: 32,
  height: 32,
};
export interface NavigateProps {
  post?: Post;
}
const nav = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog" },
  { path: "/about", name: "About" },
];
const Navigate: React.FC<NavigateProps> = ({ post }) => {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const isDarkMode = theme === "dark";
  const props = {
    className: "hover:cursor-pointer w-[18px]",
    onClick: toggleTheme,
  };
  const isDetail = isUndefined(post);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={classNames("select-none", {
        "flex items-baseline justify-between": isDetail,
      })}
    >
      {isDetail ? (
        <>
          <Link href={"/"}>
            <Image src={"/imgs/logo.svg"} alt="logo" {...sizes} />
          </Link>
          <div className="flex items-center justify-between gap-[12px]">
            {nav.map(({ path, name }) => {
              return (
                <Link
                  key={name}
                  href={path}
                  className={classNames(
                    "transition-colors duration-300 dark:text-white ",
                    {
                      "realistic-marker-highlight": path === pathname,
                    }
                  )}
                >
                  {name}
                </Link>
              );
            })}
            {mounted ? (
              isDarkMode ? (
                <Moon {...props} />
              ) : (
                <Sun {...props} />
              )
            ) : (
              <Loader className={props.className} />
            )}
          </div>
        </>
      ) : (
        <div className="prose dark:prose-invert">
          <h2 className="pt-[20px]">{post.title}</h2>
          {post.desc && (
            <p className="text-slate-700 dark:text-slate-200">{post.desc}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Navigate;

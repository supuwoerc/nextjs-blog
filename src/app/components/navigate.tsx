"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Loader } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const sizes = {
  width: 32,
  height: 32,
};
const Navigate = () => {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const isDarkMode = theme === "dark";
  const props = {
    className: "hover:cursor-pointer w-[18px]",
    onClick: toggleTheme,
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex items-baseline justify-between select-none">
      <Link href={"/"}>
        <Image src={"/imgs/logo.svg"} alt="logo" {...sizes} />
      </Link>
      <div className="flex items-center justify-between gap-[10px]">
        <Link href={""}>Post</Link>
        <Link href={""}>About</Link>
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
    </div>
  );
};

export default Navigate;

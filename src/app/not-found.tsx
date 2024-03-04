"use client";
import { Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
const initMessage = ``;
export default function NotFound() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const initTerminal = () => {
    terminal.current = new Terminal({
      cols: Math.ceil((terminalRef.current!.clientWidth) / 14),
      rows: Math.ceil((terminalRef.current!.clientHeight - 100) / 14),
      convertEol: true, //启用时，光标将设置为下一行的开头
      scrollback: 100, //终端中的回滚量
      disableStdin: false, //是否应禁用输入。
      cursorStyle: "bar", //光标样式
      cursorBlink: true, //光标闪烁
      tabStopWidth: 4,
      fontSize: 14,
      theme: {
        foreground: "yellow", //字体
        background: "#000", //背景色
        cursor: "help", //设置光标
      },
    });
    terminal.current.open(terminalRef.current!);
    terminal.current.writeln("欢迎使用 xterm.js 终端");
    terminal.current.writeln("欢迎使用 xterm.js 终端");
  };
  useEffect(() => {
    initTerminal();
    return () => {
      terminal.current?.dispose();
    };
  });
  return <div ref={terminalRef} className="w-full h-full"></div>;
}

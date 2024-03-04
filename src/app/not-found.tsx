"use client";
import { ITheme, Terminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import { CanvasAddon } from "@xterm/addon-canvas";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { ImageAddon, IImageAddonOptions } from "@xterm/addon-image";
import { WebLinksAddon } from "@xterm/addon-web-links";

const initMessage = [
  "$ \x1b[31;1m404 Not Found - \x1b[1m访问路径不存在\x1b[0m",
  "",
  "$ \x1b[31;1m试试访问的其他路径~\x1b[0m",
  "",
  "$ \x1b[33mPost-博客\x1b[0m \x1b[36mAbout-关于作者\x1b[0m",
].join("\n\r");
const customSettings: IImageAddonOptions = {
  enableSizeReports: true, // whether to enable CSI t reports (see below)
  pixelLimit: 16777216, // max. pixel size of a single image
  sixelSupport: true, // enable sixel support
  sixelScrolling: true, // whether to scroll on image output
  sixelPaletteLimit: 256, // initial sixel palette size
  sixelSizeLimit: 25000000, // size limit of a single sixel sequence
  storageLimit: 128, // FIFO storage limit in MB
  showPlaceholder: true, // whether to show a placeholder for evicted images
  iipSupport: true, // enable iTerm IIP support
  iipSizeLimit: 20000000, // size limit of a single IIP sequence
};
const baseTheme: ITheme = {
  foreground: "#F8F8F8",
  background: "#2D2E2C",
  black: "#1E1E1D",
  brightBlack: "#262625",
  red: "#CE5C5C",
  brightRed: "#FF7272",
  green: "#5BCC5B",
  brightGreen: "#72FF72",
  yellow: "#CCCC5B",
  brightYellow: "#FFFF72",
  blue: "#5D5DD3",
  brightBlue: "#7279FF",
  magenta: "#BC5ED1",
  brightMagenta: "#E572FF",
  cyan: "#5DA5D5",
  brightCyan: "#72F0FF",
  white: "#F8F8F8",
  brightWhite: "#FFFFFF",
};
function prompt(terminal: Terminal) {
  terminal.write("\r\n$ ");
}
const commands: Record<string, any> = {
  help: {
    f: (term: Terminal) => {
      term.writeln(
        ["Welcome to xterm.js! Try some of the commands below."].join("\n\r")
      );
      prompt(term);
    },
    description: "输出help信息",
  },
};
function runCommand(terminal: Terminal, command: string) {
  const cmd = command.trim().split(" ")[0];
  if (cmd.length > 0) {
    terminal.writeln("");
    if (command in commands) {
      commands[command].f(terminal);
      return;
    }
    terminal.writeln(`${command}: command not found - 未发现指令`);
  }
  prompt(terminal);
}
export default function NotFound() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const initTerminal = () => {
    terminal.current = new Terminal({
      convertEol: true, //启用时，光标将设置为下一行的开头
      scrollback: 100, //终端中的回滚量
      disableStdin: false, //是否应禁用输入。
      cursorStyle: "bar", //光标样式
      cursorBlink: true, //光标闪烁
      tabStopWidth: 4,
      fontSize: 14,
      theme: baseTheme,
      allowProposedApi: true,
    });
    const imageAddon = new ImageAddon(customSettings);
    const term = terminal.current;
    term.loadAddon(imageAddon);
    term.loadAddon(fitAddon.current);
    term.loadAddon(new WebLinksAddon());
    term.open(terminalRef.current!);
    term.loadAddon(new CanvasAddon());
    term.writeln(initMessage);
    term.writeln("\r\n$ 试试输入`help`查看其他指令");
    prompt(term!);
    term.focus();
    let command = "";
    term.onData((e) => {
      switch (e) {
        case "\u0003": // Ctrl+C
          term.write("^C");
          prompt(term);
          break;
        case "\r": // Enter
          runCommand(term, command);
          command = "";
          break;
        case "\u007F": // Backspace (DEL)
          // @ts-ignore
          if (term._core.buffer.x > 2) {
            term.write("\b \b");
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters
          if (
            (e >= String.fromCharCode(0x20) &&
              e <= String.fromCharCode(0x7e)) ||
            e >= "\u00a0"
          ) {
            command += e;
            term.write(e);
          }
      }
    });
  };
  useEffect(() => {
    initTerminal();
    setTimeout(() => {
      fitAddon.current.fit();
    });
    const resizeListener = () => {
      fitAddon.current.fit();
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
      fitAddon.current.dispose();
      terminal.current?.dispose();
    };
  }, []);
  return (
    <div className="px-[8px] w-full h-full relative overflow-y-auto flex items-center justify-center">
      <div className="mx-auto max-w-xl px-[8px] py-[8px] bg-[#2D2E2C] rounded-md">
        <div ref={terminalRef} className="w-full h-full"></div>
      </div>
    </div>
  );
}

"use client";
import { ITheme, Terminal } from "@xterm/xterm";
import React, { useCallback, useEffect, useRef } from "react";
import { CanvasAddon } from "@xterm/addon-canvas";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { ImageAddon, IImageAddonOptions } from "@xterm/addon-image";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { allPosts } from "contentlayer/generated";
import { siteConfig } from "@/config";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const message = [
  "$ \x1b[31;1m404 Not Found - \x1b[1m访问路径不存在\x1b[0m",
  "",
  "$ \x1b[31;1m试试点击下面的其他路径~\x1b[0m",
  "",
  `$ \x1b]8;;${siteConfig.navigate.blog}\x1b\\Blog-博客\x1b]8;;\x1b\\ \x1b]8;;${siteConfig.navigate.about}\x1b\\About-关于作者\x1b]8;;\x1b\\`,
  "",
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
  ls: {
    f: (term: Terminal) => {
      const colors = [`\x1b[32m`];
      term.writeln(
        allPosts
          .map((item, index) => {
            return [
              "",
              `${colors[index % colors.length]} ${item.title}\x1b[0m`,
            ];
          })
          .flat(1)
          .join("\r\n")
      );
      prompt(term);
    },
    description: "查看全部文章列表",
  },
  [".."]: {
    f: (_t: Terminal, router: AppRouterInstance) => {
      router.replace("/");
    },
    description: "回到首页",
  },
  clear: {
    f: (term: Terminal) => {
      term.write("\x1b[2J\x1b[3J\x1b[H");
      prompt(term);
    },
    description: "清空全部输出",
  },
  help: {
    f: (term: Terminal) => {
      const padding = 10;
      function formatMessage(name: string, description: string) {
        const maxLength = term.cols - padding - 3;
        let remaining = description;
        const d = [];
        while (remaining.length > 0) {
          // Trim any spaces left over from the previous line
          remaining = remaining.trimStart();
          // Check if the remaining text fits
          if (remaining.length < maxLength) {
            d.push(remaining);
            remaining = "";
          } else {
            let splitIndex = -1;
            // Check if the remaining line wraps already
            if (remaining[maxLength] === " ") {
              splitIndex = maxLength;
            } else {
              // Find the last space to use as the split index
              for (let i = maxLength - 1; i >= 0; i--) {
                if (remaining[i] === " ") {
                  splitIndex = i;
                  break;
                }
              }
            }
            d.push(remaining.substring(0, splitIndex));
            remaining = remaining.substring(splitIndex);
          }
        }
        const message =
          `  \x1b[36;1m${name.padEnd(padding)}\x1b[0m ${d[0]}` +
          d.slice(1).map((e) => `\r\n  ${" ".repeat(padding)} ${e}`);
        return message;
      }
      term.writeln(
        [
          "",
          `欢迎来到${siteConfig.domain}! 试试下面的指令～`,
          "",
          ...Object.keys(commands).map((e) =>
            formatMessage(e, commands[e].description)
          ),
        ].join("\n\r")
      );
      prompt(term);
    },
    description: "查看帮助信息",
  },
};
function runCommand(
  terminal: Terminal,
  command: string,
  router: AppRouterInstance
) {
  const cmd = command.trim().split(" ")[0];
  if (cmd.length > 0) {
    terminal.writeln("");
    if (command.toLocaleLowerCase() in commands) {
      commands[command.toLocaleLowerCase()].f(terminal, router);
      return;
    }
    terminal.writeln(`${command}: command not found - 未发现指令`);
  }
  prompt(terminal);
}
interface TerminalComponentProps {
  initMessage?: string;
}
const TerminalComponent: React.FC<TerminalComponentProps> = ({
  initMessage = message,
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef(new FitAddon());
  const router = useRouter();
  const initTerminal = useCallback(() => {
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
      linkHandler: {
        activate: (_event: MouseEvent, text: string) => {
          router.push(text);
        },
      },
    });
    const imageAddon = new ImageAddon(customSettings);
    const term = terminal.current;
    term.loadAddon(imageAddon);
    term.loadAddon(fitAddon.current);
    term.loadAddon(new WebLinksAddon());
    term.open(terminalRef.current!);
    term.loadAddon(new CanvasAddon());
    term.writeln(initMessage);
    term.writeln("\r\n$ 此外你还可以输入`help`查看帮助信息");
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
          runCommand(term, command, router);
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
  }, [initMessage, router]);
  useEffect(() => {
    initTerminal();
    const fitAddonRef = fitAddon.current;
    setTimeout(() => {
      fitAddonRef.fit();
    });
    const resizeListener = () => {
      fitAddonRef.fit();
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
      fitAddonRef.dispose();
      terminal.current?.dispose();
    };
  }, [initTerminal]);
  return (
    // TODO:修复resize样式
    <div className="w-full h-full relative overflow-y-auto flex items-center justify-center bg-[#2D2E2C] rounded-md blur-text">
      <div className="mx-auto max-w-xl px-[8px] py-[8px]">
        <div ref={terminalRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};
export default TerminalComponent;

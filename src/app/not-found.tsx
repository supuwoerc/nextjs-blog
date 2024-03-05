import dynamic from "next/dynamic";

const TerminalComponent = dynamic(() => import("./components/terminal"), {
  ssr: false,
});
export default function NotFound() {
  return <TerminalComponent />;
}

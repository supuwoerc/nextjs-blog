'use client';
import Tippy from '@tippyjs/react';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { CSSProperties, useEffect, useState } from 'react';
import { ToastOptions, toast } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

interface CopyButtonProps {
  text: string;
  autoClose?: boolean;
  duration?: number;
  style?: CSSProperties;
  onSuccess?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  onSuccess,
  autoClose = true,
  duration = 2000,
  style,
}) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const config = {
    ...toastConfig,
    theme: theme == 'light' ? 'dark' : 'light',
  };
  const btnProps = {
    size: 18,
    color: theme == 'light' ? '#000' : '#fff',
  };
  const copy = () => {
    if (!visible && navigator.clipboard && text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setVisible(true);
          onSuccess && onSuccess();
        })
        .catch((err) => {
          toast(`${err}`, config);
        });
    } else if (!navigator.clipboard) {
      toast(`访问Clipboard失败`, config);
    }
  };
  useEffect(() => {
    if (autoClose && visible) {
      setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  }, [visible, autoClose, duration]);
  return (
    <Tippy visible={visible} placement="left" content={<span>Copied!</span>}>
      <button
        onClick={copy}
        className="rounded px-1 py-1 hover:bg-[#ddd] dark:hover:bg-[#444c56]"
        style={style}
      >
        {!visible ? (
          <Copy {...btnProps} />
        ) : (
          <Check {...btnProps} color="var(--success)" />
        )}
      </button>
    </Tippy>
  );
};

interface PreProps extends React.HTMLProps<HTMLPreElement> {
  raw?: string;
}

const Pre: React.FC<React.PropsWithChildren<PreProps>> = (props) => {
  return (
    <pre
      {...props}
      className="custom-pre-code relative mt-0 overflow-hidden rounded-tl-none rounded-tr-none px-0 py-0"
    >
      <div className="code-container overflow-auto py-2 pt-3 scrollbar-thin">
        {props.children}
      </div>
      <CopyButton
        text={props.raw ?? ''}
        style={{ position: 'absolute', top: '0.4rem', right: '0.4rem' }}
      />
    </pre>
  );
};
export default Pre;

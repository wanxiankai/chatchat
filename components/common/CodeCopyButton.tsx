'use client';
import { useState } from 'react';

interface CodeCopyButtonProps {
  children: React.ReactNode;
}

export default function CodeCopyButton({ children }: CodeCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopy = () => {
    // 获取代码内容
    let code = '';
    if (children && Array.isArray(children) && 'props' in children[0]) {
      const props = children[0].props;
      if (props && props.children) {
        code = props.children;
      }
    }
    
    // 复制到剪贴板
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="code-copy-button cursor-pointer"
      aria-label="Copy code to clipboard"
    >
      {isCopied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
        </svg>
      )}
    </button>
  );
}

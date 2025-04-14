'use client';
import { memo, useMemo } from 'react';
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown';

// 将 Markdown 内容解析为块
function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map(token => token.raw);
}

// 优化单个 Markdown 块的渲染
const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  },
  (prevProps, nextProps) => {
    // 只有当内容变化时才重新渲染
    return prevProps.content === nextProps.content;
  },
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

// 主组件，将 Markdown 内容分块并优化渲染
export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);
    
    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock 
        content={block} 
        key={`${id}-block-${index}`} 
      />
    ));
  },
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown';

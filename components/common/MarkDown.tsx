import { memo } from 'react'
import ReactMarkDown, { Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function MarkDown({ children, className = '', ...props }: Options) {
    return (
        <ReactMarkDown
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return match ? (
                        <SyntaxHighlighter
                            style={a11yDark}
                            language={match?.[1] ?? ""}
                            PreTag='div'
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code
                            {...props}
                            className={className}
                        >
                            {children}
                        </code>
                    )
                }
            }}


            remarkPlugins={[remarkGfm]}
            className={`markdown prose dark:prose-invert ${className}`}
            {...props}
        >
            {children}
        </ReactMarkDown>
    )
}

export default memo(MarkDown)
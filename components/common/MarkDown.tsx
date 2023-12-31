import { memo } from 'react'
import ReactMarkDown, { Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MarkDown({ children, className = '', ...props }: Options) {
    return (
        <ReactMarkDown
            remarkPlugins={[remarkGfm]}
            className={`markdown prose dark:prose-invert ${className}`}
            {...props}
        >
            {children}
        </ReactMarkDown>
    )
}

export default memo(MarkDown)
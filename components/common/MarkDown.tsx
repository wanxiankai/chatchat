import { memo } from 'react'
import ReactMarkDown, { Options } from 'react-markdown'

function MarkDown({ children, className = '', ...props }: Options) {
    return (
        <ReactMarkDown
            className={`markdown prose dark:prose-invert ${className}`}
            {...props}
        >
            {children}
        </ReactMarkDown>
    )
}

export default memo(MarkDown)
import { Typography } from '@mui/material'
import hljs from 'highlight.js'
import { FC, ReactNode } from 'react'

interface CodeProps {
    children: ReactNode
    language: string
    languageLabel: string
}

export const Code: FC<CodeProps> = ({ children, language, languageLabel }) => {
    // eslint-disable-next-line
    const text = hljs.highlight(children as string, { language }).value

    return (
        <div className="hljs">
            <Typography mt={2} ml={2}>
                {languageLabel}
            </Typography>
            <pre>
                {/* eslint-disable-next-line */}
                <code className={`hljs language-${language}`} dangerouslySetInnerHTML={{ __html: text }}></code>
            </pre>
        </div>
    )
}

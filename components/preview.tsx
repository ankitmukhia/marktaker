import React from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css' // pre defined style
import './markdown.css'  // own style to override the pre defined

interface Props {
	docs: string
}

export const Preview: React.FC<Props> = ({ docs }) => {
	return <Markdown
		children={docs}
		className="markdown-body"
		remarkPlugins={[remarkGfm]}
		components={{
			code(props) {
				const { children, className, node, ...rest } = props
				const match = /language-(\w+)/.exec(className || '')
				return match ? (
					<SyntaxHighlighter
						PreTag="div"
						children={String(children).replace(/\n$/, '')}
						language={match[1]}
						style={dark}
					/>
				) : (
					<code {...rest} className={className}>
						{children}
					</code>
				)
			}
		}}
	/>
}

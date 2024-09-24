import React from 'react'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode';
import { languages } from '@codemirror/language-data'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { tags } from '@lezer/highlight'

interface Props {
	docs: string,
	onChange: (doc: string) => void
}

const syntaxStyle = HighlightStyle.define([
	{
		tag: tags.self,
		fontSize: '4em'
	},
	{
		tag: tags.heading1,
		fontSize: '1.6em',
		fontWeight: 'bold'
	},
	{
		tag: tags.heading2,
		fontSize: '1.4em',
		fontWeight: 'bold'
	},
	{
		tag: tags.heading3,
		fontSize: '1.2em',
		fontWeight: 'bold'
	},
])

export const Editor: React.FC<Props> = ({ docs, onChange }) => {

	return (
		<CodeMirror
			value={docs}
			theme={xcodeDark}
			onChange={(state) => {
				onChange(state)
			}}
			extensions={
				[
					markdown({ base: markdownLanguage, codeLanguages: languages, addKeymap: true }),
					syntaxHighlighting(syntaxStyle),
					EditorView.lineWrapping,
					EditorView.theme({
						'&': {
							backgroundColor: 'transparent !important',
							height: '100%',
							fontSize: '14px',
							border: 'none !important',
							outline: 'none !important'
						},
						".cm-gutters": {
							backgroundColor: 'transparent !important'
						},
						".cm-focused": {
							borderStyle: 'none !important'
						}
					})
				]}
		/>
	)
}

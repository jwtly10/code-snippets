import { useEffect, useRef, useState } from 'react'
import { format } from 'sql-formatter'
import { EditorView } from 'codemirror'
import { defaultKeymap } from '@codemirror/commands'
import { keymap, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

import Tooltip from '@mui/material/Tooltip'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import IconButton from '@mui/material/IconButton'

import toast, { Toaster } from 'react-hot-toast'
import dayjs from 'dayjs'

function SnippetView({ snippet }: { snippet: Snippet }) {
    const [formattedSnippet, setFormattedSnippet] = useState<string>('')
    const [error, setError] = useState<string>('')
    const editor: any = useRef()

    useEffect(() => {
        try {
            setFormattedSnippet(format(snippet.snippet))
        } catch (error: any) {
            setFormattedSnippet('')
            setError(error.toString())
        }
    }, [snippet])

    useEffect(() => {
        let myTheme = EditorView.theme(
            {
                '&': {
                    color: 'white',
                    backgroundColor: '#034',
                },
                '.cm-content': {
                    caretColor: '#0e9',
                },
                '&.cm-focused .cm-cursor': {
                    borderLeftColor: '#0e9',
                },
                '&.cm-focused .cm-selectionBackground, ::selection': {
                    backgroundColor: '#074',
                },
                '.cm-gutters': {
                    backgroundColor: '#045',
                    color: '#ddd',
                    border: 'none',
                },
            },
            { dark: true }
        )
        const myHighlightStyle = HighlightStyle.define([
            { tag: tags.keyword, color: '#fc6' },
            { tag: tags.comment, color: '#f5d', fontStyle: 'italic' },
        ])

        const startState = EditorState.create({
            doc: formattedSnippet,
            extensions: [
                keymap.of(defaultKeymap),
                lineNumbers(),
                myTheme,
                syntaxHighlighting(myHighlightStyle),
                EditorView.editable.of(false),
            ],
        })

        const view = new EditorView({
            state: startState,
            parent: editor.current,
        })

        displayMinimumLines(view, 5)

        return () => {
            view.destroy()
        }
    }, [formattedSnippet])

    function displayMinimumLines(view: EditorView, minLines: number) {
        const currentLineCount = view.state.doc.lines
        const currentStr = view.state.doc.toString()

        if (currentLineCount >= minLines) {
            return
        }

        const lines = minLines - currentLineCount

        const appendLines = '\n'.repeat(lines)

        view.dispatch({
            changes: { from: currentStr.length, insert: appendLines },
        })
    }

    return (
        <div className="mt-3">
            {snippet !== undefined ? (
                <div>
                    <h3 className="text-left">{snippet.title}</h3>
                    <h5 className="text-left text-secondary">
                        <small>{snippet.language}</small>
                    </h5>
                </div>
            ) : null}
            <div className="position-relative border border-dark" ref={editor}>
                <p
                    className="position-absolute copy m-2"
                    onClick={() => {
                        navigator.clipboard.writeText(formattedSnippet)
                        toast.success('Copied to clipboard!')
                    }}
                >
                    <Tooltip
                        title="Copy Snippet to Clipboard"
                        className="text-white"
                    >
                        <IconButton className="m-2">
                            <ContentPasteIcon
                                style={{ margin: 0, padding: 0 }}
                            />
                        </IconButton>
                    </Tooltip>{' '}
                </p>
                <Toaster />
                {error ? (
                    <p className="alert alert-danger mt-3 d-flex justify-content-between">
                        {error}
                    </p>
                ) : null}
            </div>

            {snippet !== undefined ? (
                <div className="mt-3 d-flex flex-column align-items-end">
                    <p className="text-secondary m-0 p-0" style={{ margin: 0 }}>
                        <small>
                            Created:{' '}
                            {dayjs(snippet.created).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}
                        </small>
                    </p>

                    <p className="text-secondary m-0 p-0">
                        <small>
                            Last Updated:{' '}
                            {dayjs(snippet.updated).format(
                                'YYYY-MM-DD HH:mm:ss'
                            )}
                        </small>
                    </p>
                </div>
            ) : null}
        </div>
    )
}

export default SnippetView

import { useEffect, useRef, useState } from 'react'
import { format } from 'sql-formatter'
import { EditorView } from 'codemirror'
import { defaultKeymap } from '@codemirror/commands'
import { keymap, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

function SnippetView({ snippet }: { snippet: string }) {
    const [formattedSnippet, setFormattedSnippet] = useState<string>('')
    const [error, setError] = useState<string>('')
    const editor = useRef()

    useEffect(() => {
        try {
            setFormattedSnippet(format(snippet))
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
            ],
        })

        const view = new EditorView({
            state: startState,
            parent: editor.current,
        })

        return () => {
            view.destroy()
        }
    }, [formattedSnippet])

    return (
        <div className="border border-dark" ref={editor}>
            {error ? (
                <p className="alert alert-danger mt-3 d-flex justify-content-between">
                    {error}
                </p>
            ) : null}
        </div>
    )
}

export default SnippetView
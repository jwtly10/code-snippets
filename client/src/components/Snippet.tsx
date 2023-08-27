import { useEffect, useRef, useState } from 'react'
import { format } from 'sql-formatter'
import { EditorView } from 'codemirror'
import { defaultKeymap } from '@codemirror/commands'
import { keymap, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

function Snippet({ snippet }: { snippet: string }) {
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
        const startState = EditorState.create({
            doc: formattedSnippet,
            extensions: [keymap.of(defaultKeymap), lineNumbers()],
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

export default Snippet

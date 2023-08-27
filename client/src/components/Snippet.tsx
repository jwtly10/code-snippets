import { useEffect, useRef, useState } from 'react'
import { format } from 'sql-formatter'
import { EditorView } from 'codemirror'
import { defaultKeymap } from '@codemirror/commands'
import { keymap, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

function Snippet({ snippet }: { snippet: string }) {
    const [formattedSnippet, setFormattedSnippet] = useState<string>('')
    const editor = useRef()

    useEffect(() => {
        try {
            setFormattedSnippet(format(snippet))
        } catch {
            setFormattedSnippet('')
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

    return <div className="border border-dark" ref={editor}></div>
}

export default Snippet

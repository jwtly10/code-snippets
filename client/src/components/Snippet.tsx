import { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { format } from 'sql-formatter'

function Snippet({ snippet }: { snippet: string }) {
    const [formattedSnippet, setFormattedSnippet] = useState<string>('')

    useEffect(() => {
        try {
            setFormattedSnippet(format(snippet))
        } catch {
            setFormattedSnippet('')
        }
    }, [snippet])

    function handleSnippetEdit() {}

    return (
        <Form.Control
            className="bg-dark"
            as="textarea"
            style={{ height: '100%' }}
            value={formattedSnippet}
            onChange={handleSnippetEdit}
        />
    )
}

export default Snippet

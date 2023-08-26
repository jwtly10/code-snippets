import { useEffect, useState } from 'react'
import axios from 'axios'
import Snippet from './Snippet'

type Snippet = {
    language: string
    title: string
    snippet: string
    snippetID?: number
    created?: Date
    updated?: Date
}

function ListSnippets() {
    const [snippets, setSnippets] = useState<any>([])

    useEffect(() => {
        axios.get('http://localhost:3000/v1/snippets').then((response) => {
            setSnippets(response.data.result)
        })
    }, [])

    return (
        <div>
            <h3>Snippets:</h3>
            {snippets.map((snippet: Snippet, index: number) => (
                <div key={index} className="card">
                    <div className="card-header">{snippet.title}</div>
                    <div className="card-body">
                        <blockquote className="blockquote mb-0">
                            <Snippet snippet={snippet.snippet} />
                        </blockquote>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListSnippets

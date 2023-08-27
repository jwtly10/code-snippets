import axios from 'axios'
import { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { format } from 'sql-formatter'
import utils from '../utils/utils'

type Snippet = {
    language: string
    title: string
    snippet: string
    snippet_id: number
    created?: Date
    updated?: Date
}

function ListDialog({
    snippet,
    onClose,
}: {
    snippet?: Snippet
    onClose: () => void
}) {
    const [error, setError] = useState<string>('')
    const [snipText, setSnippet] = useState<string>('')
    const title = useRef<HTMLInputElement>(null)
    const language = useRef<HTMLInputElement>(null)

    function handleChange(e: any) {
        setSnippet(e.target.value)
    }

    function handleSubmit() {
        // Check if anything will break before submitting
        var formattedText = ''
        var minifiedText = ''

        try {
            formattedText = format(snipText)
            minifiedText = utils.minify(formattedText)
        } catch (err: any) {
            setError(err.toString())
            return
        }

        axios
            .post('http://localhost:3000/v1/save', {
                snippet: minifiedText,
                language: language.current?.value,
                title: title.current?.value,
            })
            .then(() => {
                onClose()
            })
            .catch((err) => {
                setError(err.toString())
            })
    }

    // For now only SQL is supported
    return (
        <Card style={{ width: 700 }}>
            <div className="card-body">
                <h5 className="card-title">
                    {snippet ? 'Edit Snippet' : 'New Snippet'}
                </h5>
                <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formSnippetTitle">
                        <Form.Label>Snippet Title: </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="eg. Getting data from email table"
                            value={snippet?.title}
                            ref={title}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formSnippetLanguage"
                    >
                        <Form.Label>Language:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            defaultValue="SQL"
                            disabled={true}
                            value={snippet?.language}
                            ref={language}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSnippet">
                        <Form.Label>Snippet:</Form.Label>
                        <Form.Control
                            as="textarea"
                            required
                            value={
                                snippet
                                    ? format(snippet?.snippet || '')
                                    : snipText
                            }
                            onChange={handleChange}
                            rows={10}
                        />
                    </Form.Group>

                    {error ? (
                        <p className="alert alert-danger mt-3 d-flex justify-content-between">
                            {error}
                        </p>
                    ) : null}

                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => {
                                onClose
                            }}
                            className="m-2"
                            variant="danger"
                        >
                            Cancel
                        </Button>
                        <Button className="m-2" variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>{' '}
            </div>
        </Card>
    )
}

export default ListDialog

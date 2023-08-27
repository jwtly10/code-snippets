import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { format } from 'sql-formatter'

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
    const [snipText, setSnippet] = useState<string>('')

    function handleChange(e: any) {
        setSnippet(e.target.value)
    }
    return (
        <Card style={{ width: 700 }}>
            <div className="card-body">
                <h5 className="card-title">
                    {snippet ? 'Edit Snippet' : 'New Snippet'}
                </h5>
                <Form>
                    <Form.Group className="mb-3" controlId="formSnippetTitle">
                        <Form.Label>Snippet Title: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="eg. Getting data from email table"
                            value={snippet?.title}
                        />
                    </Form.Group>

                    <Form.Group
                        className="mb-3"
                        controlId="formSnippetLanguage"
                    >
                        <Form.Label>Language:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="eg. SQL"
                            value={snippet?.language}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSnippet">
                        <Form.Label>Snippet:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={
                                snippet
                                    ? format(snippet?.snippet || '')
                                    : snipText
                            }
                            onChange={handleChange}
                            rows={10}
                        />
                    </Form.Group>

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

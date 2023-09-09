import { useEffect, useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { format } from 'sql-formatter'
import proxy from '../services/ProxyService'
import dayjs from 'dayjs'
import Error from './Error'

import utils from '../utils/utils'

function AddEditSnippet({
    snippet,
    onClose,
    getSnippets,
}: {
    snippet?: Snippet
    onClose: () => void
    getSnippets?: () => void
}) {
    const [error, setError] = useState<string>('')
    const [snipTitle, setSnipTitle] = useState<string>('')
    const [snipLang, setSnipLang] = useState<string>('')
    const [snipText, setSnipText] = useState<string>('')
    const title = useRef<HTMLInputElement>(null)
    const language = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (snippet) {
            setSnipTitle(snippet.title)
            setSnipText(format(snippet.snippet))
            setSnipLang(snippet.language)
        }

        // If there is no snippet, set lang becuase no option to change currently.
        if (!snippet) {
            setSnipLang('SQL')
        }
    }, [])

    function handleError(err: string) {
        setError(err)
    }

    function handleLangChange(e: any) {
        setSnipLang(e.target.value)
    }

    function handleTitleChange(e: any) {
        setSnipTitle(e.target.value)
    }

    function handleSnippetChange(e: any) {
        setSnipText(e.target.value)
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        var formattedText = ''
        var minifiedText = ''

        try {
            formattedText = format(snipText)
            minifiedText = utils.minify(formattedText)
        } catch (err: any) {
            // Validating snippet
            setError(err.toString())
            return
        }

        if (snippet) {
            proxy.updateSnippet(
                snippet.snippet_id,
                minifiedText,
                snipLang,
                snipTitle,
                onClose,
                setError,
                getSnippets
            )
        } else {
            proxy.newSnippet(
                minifiedText,
                snipLang,
                snipTitle,
                onClose,
                setError
            )
        }
    }

    // For now only SQL is supported
    return (
        <Card style={{ width: 700 }}>
            <div className="card-body">
                <h5 className="card-title">
                    {snippet ? 'Edit Snippet' : 'New Snippet'}
                </h5>
                <Form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formSnippetTitle">
                        <Form.Label>Snippet Title: </Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="eg. Getting data from email table"
                            onChange={(e) => handleTitleChange(e)}
                            value={snipTitle}
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
                            value={snipLang || 'SQL'}
                            onChange={(e) => handleLangChange(e)}
                            disabled={true}
                            ref={language}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSnippet">
                        <Form.Label>Snippet:</Form.Label>
                        <Form.Control
                            as="textarea"
                            required
                            onChange={(e) => handleSnippetChange(e)}
                            value={snipText}
                            rows={10}
                        />
                    </Form.Group>

                    <Error error={error} handleError={handleError} />

                    <div className="d-flex justify-content-end">
                        {snippet ? (
                            <div
                                className="d-flex flex-column align-items-end"
                                style={{ marginRight: 10 }}
                            >
                                <p
                                    className="text-secondary m-0 p-0"
                                    style={{ margin: 0 }}
                                >
                                    <small>
                                        Created:{' '}
                                        {dayjs(snippet.created).format(
                                            'YYYY-MM-DD HH:mm:ss'
                                        )}
                                    </small>
                                </p>
                                <p
                                    className="text-secondary m-0 p-0"
                                    style={{ margin: 0 }}
                                >
                                    <small>
                                        Last Updated:{' '}
                                        {dayjs(snippet.updated).format(
                                            'YYYY-MM-DD HH:mm:ss'
                                        )}
                                    </small>
                                </p>
                            </div>
                        ) : null}
                        <Button
                            onClick={() => {
                                onClose()
                            }}
                            className="m-2"
                            variant="danger"
                        >
                            Cancel
                        </Button>
                        <Button className="m-2" variant="primary" type="submit">
                            {snippet ? 'Update' : 'Save'}
                        </Button>
                    </div>
                </Form>{' '}
            </div>
        </Card>
    )
}

export default AddEditSnippet

import { useEffect, useState } from 'react'
import axios from 'axios'
import Snippet from './Snippet'
import SnippetDialog from './SnippetDialog'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import DeleteDialog from './DeleteDialog'
import 'react-confirm-alert/src/react-confirm-alert.css'

type Snippet = {
    language: string
    title: string
    snippet: string
    snippet_id: number
    created?: Date
    updated?: Date
}

function ListSnippets() {
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState<number | undefined>(undefined)

    useEffect(() => {
        axios.get('http://localhost:3000/v1/snippets').then((response) => {
            setSnippets(response.data.result)
        })
    }, [])

    function toggleSelection(index: number) {
        setActiveItem(index)
    }

    function editSnippet(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <SnippetDialog
                            onClose={onClose}
                            snippet={snippets[index]}
                        />
                    </Container>
                )
            },
        })
    }

    function deleteSnippet(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                setActiveItem(undefined)
                return (
                    <Container>
                        <DeleteDialog
                            id={snippets[index].snippet_id}
                            snippets={snippets}
                            onClose={onClose}
                            setSnippets={setSnippets}
                            setError={setError}
                        />
                    </Container>
                )
            },
        })
    }

    return (
        <Container>
            {snippets.length > 0 ? (
                <Row>
                    <Col>
                        <ListGroup>
                            {error ? (
                                <p className="alert alert-danger mt-3 d-flex justify-content-between">
                                    {error}
                                    <span
                                        onClick={() => setError('')}
                                        className="btn-close"
                                    ></span>
                                </p>
                            ) : null}
                            {snippets.map((snippet: Snippet, index: number) => (
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => toggleSelection(index)}
                                    className="d-flex justify-content-between align-items-center"
                                    active={activeItem == index}
                                >
                                    {'[' +
                                        snippet.language +
                                        '] ' +
                                        snippet.title}
                                    {activeItem == index ? (
                                        <div className="d-flex justify-content-between w-25">
                                            <span
                                                onClick={() => {
                                                    editSnippet(index)
                                                }}
                                                className="btn btn-secondary"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="m-0 btn btn-danger"
                                                onClick={() =>
                                                    deleteSnippet(index)
                                                }
                                            >
                                                Delete
                                            </span>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col>
                        {activeItem !== undefined ? (
                            <Snippet snippet={snippets[activeItem].snippet} />
                        ) : null}
                    </Col>
                </Row>
            ) : (
                <p>No snippets found</p>
            )}
        </Container>
    )
}

export default ListSnippets

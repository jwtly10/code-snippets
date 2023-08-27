import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Snippet from './Snippet'
import SnippetDialog from './SnippetDialog'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
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

    function confirmDelete(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <div className="card" style={{ width: 500 }}>
                            <div className="card-body">
                                <h5 className="card-title">Are you sure?</h5>
                                <p className="card-text">
                                    This will delete all snippet data.
                                </p>

                                <Row className="d-flex justify-content-center">
                                    <Col className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-secondary w-75"
                                            onClick={onClose}
                                        >
                                            No
                                        </button>
                                    </Col>

                                    <Col className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-danger w-75"
                                            onClick={() => {
                                                axios
                                                    .delete(
                                                        'http://localhost:3000/v1/delete/' +
                                                            snippets[index]
                                                                .snippet_id
                                                    )
                                                    .then(() => {
                                                        setSnippets(
                                                            snippets.filter(
                                                                (
                                                                    snippet: Snippet
                                                                ) =>
                                                                    snippet.snippet_id !==
                                                                    snippets[
                                                                        index
                                                                    ].snippet_id
                                                            )
                                                        )
                                                        setActiveItem(undefined)
                                                    })
                                                    .catch((error) => {
                                                        setError(
                                                            'Error: ' +
                                                                error.response
                                                                    .data.error
                                                        )
                                                    })

                                                onClose()
                                            }}
                                        >
                                            Yes, Delete it!
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
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
                                                    confirmDelete(index)
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

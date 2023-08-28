import { useEffect, useState } from 'react'
import axios from 'axios'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import DeleteDialog from './DeleteDialog'
import SnippetView from './SnippetView'
import AddEditSnippet from './AddEditSnippet'

function ListSnippets() {
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [error, setError] = useState('')
    const [activeItem, setActiveItem] = useState<number | undefined>(undefined)

    useEffect(() => {
        axios
            .get('http://localhost:3000/v1/snippets')
            .then((response) => {
                setSnippets(response.data.result)
            })
            .catch((err) => {
                setError(err.message)
            })
    }, [])

    function toggleSelection(index: number) {
        setActiveItem(index)
    }

    function updateSnippets() {
        axios
            .get('http://localhost:3000/v1/snippets')
            .then((response) => {
                setSnippets(response.data.result)
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    function editSnippet(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <AddEditSnippet
                            onClose={onClose}
                            snippet={snippets[index]}
                            updateSnippets={updateSnippets}
                        />
                    </Container>
                )
            },
        })
    }

    function deleteSnippet(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <DeleteDialog
                            id={snippets[index].snippet_id}
                            snippets={snippets}
                            onClose={() => {
                                onClose()
                                setActiveItem(undefined)
                            }}
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
            {error ? (
                <p className="alert alert-danger mt-3 d-flex justify-content-between">
                    {error}
                    <span
                        onClick={() => setError('')}
                        className="btn-close"
                    ></span>
                </p>
            ) : null}
            {snippets.length > 0 ? (
                <Row>
                    <Col>
                        <ListGroup>
                            {snippets.map((snippet: Snippet, index: number) => (
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => toggleSelection(index)}
                                    className="d-flex justify-content-between align-items-center"
                                    style={{
                                        height: '50px',
                                    }}
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
                                                className="m-0 btn btn-secondary"
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
                            <SnippetView
                                snippet={snippets[activeItem].snippet}
                            />
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

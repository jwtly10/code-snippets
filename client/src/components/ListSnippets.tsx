import { useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import DeleteDialog from './DeleteDialog'
import SnippetView from './SnippetView'
import AddEditSnippet from './AddEditSnippet'

function ListSnippets({
    snippets,
    getSnippets,
    handleError,
}: {
    snippets: Snippet[]
    getSnippets: () => void
    handleError: (error: string) => void
}) {
    const [activeItem, setActiveItem] = useState<number | undefined>(undefined)

    function toggleSelection(index: number) {
        setActiveItem(index)
    }

    function editSnippet(index: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <AddEditSnippet
                            onClose={onClose}
                            snippet={snippets[index]}
                            getSnippets={getSnippets}
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
                            getSnippets={getSnippets}
                            onClose={() => {
                                onClose()
                                setActiveItem(undefined)
                            }}
                            handleError={handleError}
                        />
                    </Container>
                )
            },
        })
    }

    return (
        <div>
            {snippets.length > 0 ? (
                <Row>
                    <Col>
                        <ListGroup>
                            {snippets.map((snippet: Snippet, index: number) => (
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => toggleSelection(index)}
                                    className="d-flex justify-content-between align-items-center "
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
        </div>
    )
}

export default ListSnippets

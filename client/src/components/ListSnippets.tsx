import { useState } from 'react'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Tooltip from '@mui/material/Tooltip'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'

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

    function handleNewSnippet() {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <AddEditSnippet
                            onClose={() => {
                                onClose()
                                getSnippets()
                            }}
                        />
                    </Container>
                )
            },
        })
    }

    return (
        <div className="w-100">
            {snippets.length > 0 ? (
                <Row style={{ height: '100%' }}>
                    <Col
                        className="m-0 w-100"
                        style={{
                            height: '100%',
                            paddingRight: '0',
                            borderRight: '1px solid grey',
                            maxWidth: '20%',
                            minWidth: 550,
                        }}
                    >
                        <div className="d-flex flex-row justify-content-between">
                            <h4 className="m-3 text-start ">
                                {'All Snippets (' + snippets.length + ')'}
                            </h4>
                            <Tooltip
                                title="New Snippet"
                                className="text-primary"
                            >
                                <IconButton
                                    className="m-2"
                                    onClick={handleNewSnippet}
                                >
                                    <AddCircleOutlineIcon
                                        style={{ margin: 0, padding: 0 }}
                                    />
                                </IconButton>
                            </Tooltip>{' '}
                        </div>
                        <ListGroup>
                            {snippets.map((snippet: Snippet, index: number) => (
                                <ListGroup.Item
                                    key={index}
                                    onClick={() => toggleSelection(index)}
                                    className="border-0 border-bottom d-flex rounded-0 w-100 justify-content-between align-items-center "
                                    style={{
                                        borderLeft: '0 !important',
                                    }}
                                    active={activeItem == index}
                                >
                                    <div className="d-flex align-items-start flex-column">
                                        <h6 style={{ margin: 0 }}>
                                            {snippet.title}
                                        </h6>
                                        <p
                                            className="text-secondary"
                                            style={{ margin: 0 }}
                                        >
                                            <small> {snippet.language}</small>
                                        </p>
                                    </div>
                                    {activeItem == index ? (
                                        <div className="d-flex justify-content-end w-25">
                                            <span
                                                onClick={() => {
                                                    editSnippet(index)
                                                }}
                                                className="btn btn-secondary edit"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                className="btn btn-danger"
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
                    <Col className="m-5 p-0 mt-0">
                        {activeItem !== undefined ? (
                            <SnippetView snippet={snippets[activeItem]} />
                        ) : null}
                    </Col>
                </Row>
            ) : (
                <p className="text-secondary m-5">No snippets found</p>
            )}
        </div>
    )
}

export default ListSnippets

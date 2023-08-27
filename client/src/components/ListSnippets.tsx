import { useEffect, useState } from 'react'
import axios from 'axios'
import Snippet from './Snippet'
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
    const [activeItem, setActiveItem] = useState<number | undefined>(undefined)

    useEffect(() => {
        axios.get('http://localhost:3000/v1/snippets').then((response) => {
            setSnippets(response.data.result)
        })
    }, [snippets])

    function toggleSelection(id: number) {
        setActiveItem(id)
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
                                                    .then((response) => {
                                                        if (
                                                            response.data.result
                                                        ) {
                                                            setSnippets(
                                                                snippets.filter(
                                                                    (
                                                                        snippet: Snippet
                                                                    ) =>
                                                                        snippet.snippet_id !==
                                                                        snippets[
                                                                            index
                                                                        ]
                                                                            .snippet_id
                                                                )
                                                            )
                                                            setActiveItem(
                                                                undefined
                                                            )
                                                        }
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
    // confirmAlert({
    //     title: 'Delete Snippet',
    //     message: 'Are you sure you want to delete this snippet?',
    //     buttons: [
    //         {
    //             label: 'Yes',
    //             onClick: () => {
    //                 axios
    //                     .delete(
    //                         'http://localhost:3000/v1/delete/' +
    //                             snippets[index].snippet_id
    //                     )
    //                     .then((response) => {
    //                         if (response.data.result) {
    //                             setSnippets(
    //                                 snippets.filter(
    //                                     (snippet: Snippet) =>
    //                                         snippet.snippet_id !==
    //                                         snippets[index].snippet_id
    //                                 )
    //                             )
    //                             setActiveItem(undefined)
    //                         }
    //                     })
    //             },
    //         },
    //         {
    //             label: 'No',
    //             onClick: () => {},
    //         },
    //     ],
    // })

    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup>
                        {snippets.map((snippet: Snippet, index: number) => (
                            <ListGroup.Item
                                key={index}
                                onClick={() => toggleSelection(index)}
                                className="d-flex justify-content-between align-items-center"
                                active={activeItem == index}
                            >
                                {'[' + snippet.language + '] ' + snippet.title}
                                {activeItem == index ? (
                                    <div className="d-flex justify-content-between w-25">
                                        <span
                                            onClick={(e) => {
                                                console.log(e)
                                            }}
                                            className="btn btn-secondary"
                                        >
                                            Edit
                                        </span>
                                        <span
                                            className="m-0 btn btn-danger"
                                            onClick={() => confirmDelete(index)}
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
                    ) : (
                        <p>Click on a snippet to view it.</p>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ListSnippets

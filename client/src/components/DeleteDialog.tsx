import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'

type Snippet = {
    language: string
    title: string
    snippet: string
    snippet_id: number
    created?: Date
    updated?: Date
}

function DeleteDialog({
    id,
    snippets,
    onClose,
    setSnippets,
    setError,
}: {
    id: number
    snippets: Snippet[]
    onClose: () => void
    setSnippets: (snippets: Snippet[]) => void
    setError: (error: string) => void
}) {
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
                                                id
                                        )
                                        .then(() => {
                                            setSnippets(
                                                snippets.filter(
                                                    (snippet: Snippet) =>
                                                        snippet.snippet_id !==
                                                        id
                                                )
                                            )
                                        })
                                        .catch((error) => {
                                            setError(
                                                'Error: ' +
                                                    error.response.data.error
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
}

export default DeleteDialog

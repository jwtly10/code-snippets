import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'

function DeleteDialog({
    id,
    getSnippets,
    onClose,
    handleError,
}: {
    id: number
    getSnippets: () => void
    onClose: () => void
    handleError: (error: string) => void
}) {
    return (
        <Container>
            <div className="card" style={{ width: 500 }}>
                <div className="card-body">
                    <h5 className="card-title">Are you sure?</h5>
                    <p className="card-text">
                        This will delete all snippet data.
                    </p>
                    s{' '}
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
                                            'http://localhost:3000/v1/delete/f' +
                                                id
                                        )
                                        .then(() => {
                                            getSnippets()
                                            onClose()
                                        })
                                        .catch((error) => {
                                            handleError(error.toString())
                                            onClose()
                                        })
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

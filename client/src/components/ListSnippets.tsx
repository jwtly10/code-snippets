import { useEffect, useState } from 'react'
import axios from 'axios'
import Snippet from './Snippet'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'

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
    }, [])

    function toggleSelection(id: number) {
        if (activeItem == id) {
            setActiveItem(undefined)
            return
        }

        setActiveItem(id)
    }

    return (
        <Container className="bg-dark">
            <Row className="bg-dark">
                <Col className="bg-dark">
                    <ListGroup className="bg-dark">
                        {snippets.map((snippet: Snippet, index: number) => (
                            <ListGroup.Item
                                key={index}
                                className="bg-dark"
                                onClick={() => toggleSelection(index)}
                                active={activeItem == index}
                            >
                                {snippet.snippet_id +
                                    ' [' +
                                    snippet.language +
                                    '] ' +
                                    snippet.title}
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

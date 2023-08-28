import ListSnippets from './components/ListSnippets'
import './App.css'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from './components/SideBar'
import Error from './components/Error'

function App() {
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
        getSnippets()
    }, [])

    function handleError(error: string) {
        setError(error)
    }

    function getSnippets() {
        axios
            .get('http://localhost:3000/v1/snippets')
            .then((response) => {
                setSnippets(response.data.result)
            })
            .catch((err) => {
                setError(err.toString())
            })
    }

    return (
        <>
            <div style={{ display: 'flex', height: '100%' }}>
                <SideBar snippets={snippets} getSnippets={getSnippets} />
                <Container className="mt-4">
                    <Error error={error} handleError={handleError} />
                    <ListSnippets
                        snippets={snippets}
                        getSnippets={getSnippets}
                        handleError={handleError}
                    />
                </Container>
            </div>
        </>
    )
}

export default App

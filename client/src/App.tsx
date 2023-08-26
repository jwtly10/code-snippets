import ListSnippets from './components/ListSnippets'
import './App.css'
import { Container } from 'react-bootstrap'

function App() {
    return (
        <>
            <Container>
                <h1>code-snippets</h1>
                <ListSnippets />
            </Container>
        </>
    )
}

export default App

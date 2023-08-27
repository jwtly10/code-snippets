import ListSnippets from './components/ListSnippets'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import AddEditSnippet from './components/AddEditSnippet'

function App() {
    function handleNewSnippet() {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <Container>
                        <AddEditSnippet onClose={onClose} />
                    </Container>
                )
            },
        })
    }
    return (
        <>
            <Container>
                <h1>code-snippets</h1>
                <Button onClick={handleNewSnippet}>Add Snippet</Button>
                <ListSnippets />
            </Container>
        </>
    )
}

export default App

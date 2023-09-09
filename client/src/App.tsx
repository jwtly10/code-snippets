import ListSnippets from './components/ListSnippets'
import './App.css'
import { useEffect, useState } from 'react'
import proxy from './services/ProxyService'
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
        proxy.getSnippets(setSnippets, setError)
    }

    return (
        <>
            <div style={{ display: 'flex', height: '100%' }}>
                <SideBar snippets={snippets} getSnippets={getSnippets} />
                <Error error={error} handleError={handleError} />
                <ListSnippets
                    snippets={snippets}
                    getSnippets={getSnippets}
                    handleError={handleError}
                />
            </div>
        </>
    )
}

export default App

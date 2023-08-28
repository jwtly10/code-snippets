import ListSnippets from './components/ListSnippets'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import AddEditSnippet from './components/AddEditSnippet'
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
        <>
            <div style={{ display: 'flex', height: '100%' }}>
                <Sidebar backgroundColor="#1F1F21">
                    <Menu
                        menuItemStyles={{
                            button: {
                                backgroundColor: '#1F1F21',
                                '&:hover': {
                                    backgroundColor: '#3c3c3f',
                                },
                            },
                        }}
                    >
                        <div className="d-flex flex-column justify-content-center p-3">
                            <h2 className="mb-3">code-snippets</h2>
                            <Button
                                className="btn btn-primary w-100"
                                onClick={handleNewSnippet}
                            >
                                New Snippet
                            </Button>
                        </div>

                        <MenuItem>
                            <span className="d-flex justify-content-between align-items-center">
                                <p className="m-0">All Snippets</p>
                                <p className="text-secondary m-0">
                                    {snippets.length}
                                </p>
                            </span>
                        </MenuItem>
                        <SubMenu label="Folders">
                            <MenuItem>Work</MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
                <Container>
                    {error ? (
                        <p className="alert alert-danger mt-3 d-flex justify-content-between">
                            {error}
                            <span
                                onClick={() => setError('')}
                                className="btn-close"
                            ></span>
                        </p>
                    ) : null}
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

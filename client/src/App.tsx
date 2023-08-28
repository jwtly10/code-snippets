import ListSnippets from './components/ListSnippets'
import './App.css'
import { Button, Container } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import AddEditSnippet from './components/AddEditSnippet'
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar'

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

                        <MenuItem>All Snippets</MenuItem>
                        <SubMenu label="Folders">
                            <MenuItem>jfdskjfsldkj</MenuItem>
                        </SubMenu>
                    </Menu>
                </Sidebar>
                <Container>
                    <ListSnippets />
                </Container>
            </div>
        </>
    )
}

export default App

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Button, Container } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import AddEditSnippet from './AddEditSnippet'

function SideBar({
    snippets,
    getSnippets,
}: {
    snippets: Snippet[]
    getSnippets: () => void
}) {
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
        <Sidebar className="sidebar" backgroundColor="#1F1F21">
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
                        <p className="m-0" style={{ margin: 0 }}>
                            All Snippets
                        </p>
                        <p className="text-secondary m-0" style={{ margin: 0 }}>
                            {snippets.length}
                        </p>
                    </span>
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}

export default SideBar

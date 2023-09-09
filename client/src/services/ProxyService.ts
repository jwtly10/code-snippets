import axios from 'axios'

const BACKEND_URL = 'http://localhost:3000'

function getSnippets(
    setSnippets: (response: any) => void,
    setError: (err: string) => void
) {
    axios
        .get('http://localhost:3000/v1/snippets')
        .then((response) => {
            setSnippets(response.data.result)
        })
        .catch((err) => {
            setError(err.toString())
        })
}

function updateSnippet(
    snippetID: number,
    snippet: string,
    lang: string,
    title: string,
    onClose: () => void,
    setError: (err: string) => void,
    getSnippets?: () => void
) {
    axios
        .put('http://localhost:3000/v1/update/' + snippetID, {
            snippet: snippet,
            language: lang,
            title: title,
        })
        .then(() => {
            onClose()
            if (getSnippets) {
                getSnippets()
            }
        })
        .catch((err) => {
            setError(err.toString())
        })
}

function newSnippet(
    snippet: string,
    lang: string,
    title: string,
    onClose: () => void,
    setError: (err: string) => void
) {
    axios
        .post('http://localhost:3000/v1/save', {
            snippet: snippet,
            language: lang,
            title: title,
        })
        .then(() => {
            onClose()
        })
        .catch((err) => {
            setError(err.toString())
        })
}

function deleteSnippet(
    id: number,
    onClose: () => void,
    handleError: (err: string) => void,
    getSnippets: () => void
) {
    axios
        .delete('http://localhost:3000/v1/delete/' + id)
        .then(() => {
            getSnippets()
            onClose()
        })
        .catch((error) => {
            handleError(error.toString())
            onClose()
        })
}

export default { getSnippets, updateSnippet, newSnippet, deleteSnippet }

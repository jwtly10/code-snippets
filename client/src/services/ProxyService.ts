import axios from 'axios'
import local from './LocalService'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const ENV = process.env.NODE_ENV

// Current Running mode
console.log('Running: ', ENV)

function getSnippets(
    setSnippets: (response: any) => void,
    setError: (err: string) => void
) {
    if (ENV === 'demo') {
        local.localGetAll(setSnippets)
        return
    }

    axios
        .get(BACKEND_URL + 'snippets')
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
    if (ENV === 'demo') {
        local.localUpdate(snippetID, snippet, lang, title)
        getSnippets && getSnippets()
        onClose()
        return
    }

    axios
        .put(BACKEND_URL + 'update/' + snippetID, {
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
    if (ENV === 'demo') {
        local.localNew(snippet, lang, title)
        onClose()
        return
    }

    axios
        .post(BACKEND_URL + 'save', {
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
    if (ENV === 'demo') {
        local.localDelete(id)
        getSnippets()
        onClose()
        return
    }

    axios
        .delete(BACKEND_URL + 'delete/' + id)
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

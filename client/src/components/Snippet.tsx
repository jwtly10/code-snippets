import { format } from 'sql-formatter'

function Snippet({ snippet }: { snippet: string }) {
    function handleSnippetEdit() {}
    return (
        <textarea
            onChange={handleSnippetEdit}
            value={format(snippet)}
        ></textarea>
    )
}

export default Snippet

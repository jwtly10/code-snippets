function localGetAll(setSnippets: (snippets: Snippet[]) => void) {
    localStorage.getItem('snippets') &&
        setSnippets(JSON.parse(localStorage.getItem('snippets') || '{}'))
}

function localUpdate(
    snippetID: number,
    snippet: string,
    lang: string,
    title: string
) {
    let snippets: Snippet[] = JSON.parse(
        localStorage.getItem('snippets') || '{}'
    )

    for (let key in snippets) {
        if (snippets[key].snippet_id === snippetID) {
            snippets[key].snippet = snippet
            snippets[key].language = lang
            snippets[key].title = title
            snippets[key].updated = new Date()
        }
    }

    localStorage.setItem('snippets', JSON.stringify(snippets))
}

function localNew(snippet: string, lang: string, title: string) {
    let snippets: Snippet[] = localStorage.getItem('snippets')
        ? JSON.parse(localStorage.getItem('snippets') || '{}')
        : {}
    let lastID = 0
    for (let key in snippets) {
        if (snippets[key].snippet_id > lastID) {
            lastID = snippets[key].snippet_id
        }
    }

    if (snippets.length === 0) {
        localStorage.setItem(
            'snippets',
            JSON.stringify([
                {
                    snippet_id: lastID + 1,
                    language: lang,
                    title: title,
                    snippet: snippet,
                    created: new Date(),
                    updated: new Date(),
                },
            ])
        )

        return
    }

    localStorage.setItem(
        'snippets',
        JSON.stringify([
            ...snippets,
            {
                snippet_id: lastID + 1,
                language: lang,
                title: title,
                snippet: snippet,
                created: new Date(),
                updated: new Date(),
            },
        ])
    )
}

function localDelete(snippetID: number) {
    let snippets: Snippet[] = JSON.parse(
        localStorage.getItem('snippets') || '{}'
    )
    let newSnippets = snippets.filter((snippet) => {
        return snippet.snippet_id !== snippetID
    })
    localStorage.setItem('snippets', JSON.stringify(newSnippets))
}

export default { localGetAll, localNew, localUpdate, localDelete }

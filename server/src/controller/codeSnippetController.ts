import { Request, Response, NextFunction } from 'express'
import db from '../config'
import logger from '../utils/logger'

type Snippet = {
    language: string
    title: string
    snippet: string
    snippet_id: number
    created?: Date
    updated?: Date
}

const getAllSnippets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const query =
            'SELECT snippet_id, language, title, snippet, created, updated FROM snippets_tb'

        db.query(query, (err, result) => {
            if (err) {
                logger.error(err)
                return res.status(500).json({ error: 'Internal Server Error' })
            }
            return res.status(200).json({ result })
        })
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getSnippet = async (req: Request, res: Response, next: NextFunction) => {
    return (
        res.status(200).json({ testKey: 'testvalue' }) ||
        res.status(200).json('Test')
    )
}

const saveSnippet = async (req: Request, res: Response) => {
    try {
        const snippet: Snippet = req.body

        const query =
            'INSERT INTO snippets_tb (language,title,snippet,created,updated) VALUES (?,?,?,NOW(),NOW())'
        db.query(
            query,
            [snippet.language, snippet.title, snippet.snippet],
            (err, result) => {
                if (err) {
                    logger.error(err)
                    return res
                        .status(500)
                        .json({ error: 'Snippet Validation Failed' })
                }
                return res
                    .status(200)
                    .json({ message: result.insertId.toString() })
            }
        )
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

const updateSnippet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return (
        res.status(200).json({ testKey: 'testvalue' }) ||
        res.status(200).json('Test')
    )
}

const deleteSnippet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        var id = req.params.id

        const query = 'DELETE FROM snippets_tb WHERE snippet_id = ?'

        db.query(query, [id], (err, result) => {
            if (err) {
                logger.error(err)
                return res
                    .status(500)
                    .json({ error: 'Deleting snippet failed' })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Snippet not found' })
            }

            return res.status(200).json({ message: 'Snippet deleted' })
        })
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default {
    getAllSnippets,
    getSnippet,
    saveSnippet,
    updateSnippet,
    deleteSnippet,
}

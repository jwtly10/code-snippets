import { Request, Response, NextFunction } from 'express'
import db from '../config'
import logger from '../utils/logger'

const getAllSnippets = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return (
        res.status(200).json({ testKey: 'testvalue' }) ||
        res.status(200).json('Test')
    )
}

const getSnippet = async (req: Request, res: Response, next: NextFunction) => {
    return (
        res.status(200).json({ testKey: 'testvalue' }) ||
        res.status(200).json('Test')
    )
}

type Snippet = {
    language: string
    title: string
    snippet: string
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
                    .json({ snippetIDGenerated: result.insertId })
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
    return (
        res.status(200).json({ testKey: 'testvalue' }) ||
        res.status(200).json('Test')
    )
}

export default {
    getAllSnippets,
    getSnippet,
    saveSnippet,
    updateSnippet,
    deleteSnippet,
}
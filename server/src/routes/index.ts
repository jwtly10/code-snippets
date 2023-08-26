import express from 'express'
import codeSnippet from './codeSnippetRoute'

const router = express.Router()

router.use('/v1', codeSnippet)

export default router

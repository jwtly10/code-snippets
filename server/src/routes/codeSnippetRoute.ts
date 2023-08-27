import express from 'express'
import snippet from '../controller/codeSnippetController'

const router = express.Router()

router.get('/snippets', snippet.getAllSnippets)
router.post('/save', snippet.saveSnippet)
router.get('/snippet/:id', snippet.getSnippet)
router.put('/update/:id', snippet.updateSnippet)
router.delete('/delete/:id', snippet.deleteSnippet)

export default router

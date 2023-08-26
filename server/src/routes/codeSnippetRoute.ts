import express from "express";
import snippet from "../controller/codeSnippetController";

const router = express.Router();

router.get("/getAllSnippets", snippet.getAllSnippets);
router.get("/getSnippet", snippet.getSnippet);
router.post("/saveSnippet", snippet.saveSnippet);
router.put("/updateSnippet", snippet.updateSnippet);
router.post("/deleteSnippet", snippet.deleteSnippet);

export default router;

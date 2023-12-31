import http from 'http'
import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes'
import bodyParser from 'body-parser'
import logger from './utils/logger'
import * as dotenv from 'dotenv'

const app: Express = express()

const FRONTEND_URL = process.env.FRONTEND_URL

// logging
app.use(morgan('dev'))
// parse request
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    cors({
        origin: FRONTEND_URL,
    })
)

app.use((req, res, next) => {
    // set cors policy
    res.header('Access-Control-Allow-Origin, "*')
    // set cors header
    res.header(
        'Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    // set the cors method headers
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        )
        // return response
        return res.status(200).json({})
    }
    next()
})

app.use('/', router)

// error handling
app.use((req, res, next) => {
    const error = new Error('Not found')
    return res.status(404).json({
        message: error.message,
    })
})

const httpServer = http.createServer(app)
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => logger.info(`Server running on port ${PORT}`))

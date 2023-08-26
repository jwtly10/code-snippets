import winston from 'winston'
const { combine, timestamp, label, printf, colorize } = winston.format

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = winston.createLogger({
    format: combine(
        label({ label: 'Snippet' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myFormat,
        colorize({ all: true })
    ),
    transports: [new winston.transports.Console()],
})

export default logger

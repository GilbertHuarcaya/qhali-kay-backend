import pino from 'pino'
import dayjs from 'dayjs'

const transport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: true,
    levelFirst: true,
    ignore: 'pid,hostname',
    messageKey: 'msg',
    timestampKey: 'time',
    levelKey: 'level'
  }
})

// Logger
const log = pino(
  {
    level: 'debug',
    timestamp: () => `,"time":"${dayjs().format('YYYY-MM-DD HH:mm:ss')}"`
  },
  transport
)

export default log

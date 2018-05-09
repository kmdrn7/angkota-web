import Server from './server'
import config from './config/main'

const port = process.env.port || config.PORT
const server = new Server()
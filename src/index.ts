import Server from './app/server'
import config from './app/config/main'

const port = process.env.port || config.PORT
const server = new Server()
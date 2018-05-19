import AppServer from './app/appServer'
import config from './app/config/main'

const port = process.env.port || config.PORT
const server = new AppServer()
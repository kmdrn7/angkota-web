import * as express from 'express'
import * as MainRouter from './routes/router'
import {Socket as Socket} from './socket/init'
import config from './config/main'
import { json, urlencoded } from 'body-parser'
import * as ExpressSession from 'express-session'
import * as logger from 'morgan'
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';


class AppServer {

    app: express.Application
    router: express.Router
    server: Server
    io: socketIo.Server

    constructor () {
        this.app = express()
        this.routes()
        this.config()
        this.socket()
        this.bootstrap()
    }

    config (): void {
        this.app.use(logger('dev'))
        this.app.use(json())
        this.app.use(urlencoded({ extended: false }))
        this.app.use(express.static(config.__dirname + '/public'))
        this.app.use(ExpressSession({
            secret:  'angkota-session-key',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 60000
            }
        }));        
        this.app.set('view engine', 'ejs');
        this.app.set('views', config.__dirname + '/resources/views')
        this.app.use(this.router)
    }

    routes (): void {        
        this.router = MainRouter.router
    }

    socket (): void {
        this.server = this.app.listen(3001)
        this.io = socketIo(this.server)
        new Socket(this.io)
    }

    bootstrap (): void {
        this.app.listen(config.PORT, () => {
            console.log('Listening server on port ' + config.PORT + '...')
        })
    }

}

export default AppServer
import * as express from 'express'
import * as MainRouter from './routes/router'
import {Socket as Socket} from './socket/init'
import config from './config/main'
import * as bodyParser from 'body-parser'
import * as ExpressSession from 'express-session'
import * as logger from 'morgan'
import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import * as firebase from 'firebase-admin'
import * as cors from 'cors'

class AppServer {

    app: express.Application
    router: express.Router
    server: Server
    io: socketIo.Server
    serviceAccount: any

    constructor () {
        this.app = express()
        this.firebase()
        this.routes()
        this.config()
        this.socket()        
        this.bootstrap()
    }

    config (): void {        
        this.app.use(cors())
        this.app.use(logger('dev'))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
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
        this.app.use(cors)
        this.server = this.app.listen(7361,'0.0.0.0')
        this.io = socketIo(this.server)
        new Socket(this.io)
    }

    bootstrap (): void {
        this.app.listen(config.PORT, () => {
            console.log('Listening server on port ' + config.PORT + '...')
        })
    }

    firebase (): void {
        this.serviceAccount = require('../../ServiceAccountKey.json')
        firebase.initializeApp({
            credential: firebase.credential.cert(this.serviceAccount),
            databaseURL: 'https://angkota-cc8ac.firebaseio.com'
        })
    }

}

export default AppServer
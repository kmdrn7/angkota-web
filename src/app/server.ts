import * as express from 'express'
import * as MainRouter from './routes/router'
import config from './config/main'
import * as bodyParser from 'body-parser'
import * as ExpressSession from 'express-session'
import * as logger from 'morgan'

class Server {

    app: express.Application
    router: express.Router    

    constructor () {
        this.app = express()
        this.routes()
        this.config()
        this.bootstrap()
    }

    config (): void {        
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

    bootstrap (): void {
        this.app.listen(config.PORT, () => {
            console.log('Listening server on port ' + config.PORT + '...')
        })
    }

}

export default Server
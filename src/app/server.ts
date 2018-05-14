import * as express from 'express'
import * as MainRouter from './routes/router'
import config from './config/main'
import { json, urlencoded } from 'body-parser'
import * as MustacheExpress from 'mustache-express'
import * as ExpressSession from 'express-session'

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
        this.app.engine('hbs', MustacheExpress())
        this.app.set('view engine', 'hbs')
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
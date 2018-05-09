import * as express from 'express'
import * as MainRouter from './routes/router'
import config from './config/main'
import { json } from 'body-parser'
import * as MustacheExpress from 'mustache-express'

class Server {

    app: express.Application
    router: express.Router

    constructor (){
        this.app = express()
        this.routes()
        this.config()
        this.bootstrap()
    }

    config (): void {
        this.app.use(json())
        this.app.engine('hbs', MustacheExpress())
        this.app.set('view engine', 'hbs')
        this.app.set('views', __dirname + '/views')
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
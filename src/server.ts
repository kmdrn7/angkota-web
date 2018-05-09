import * as express from 'express'
import * as MainRouter from './routes/router'
import config from './config/main'
import { json } from 'body-parser'

class Server {

    app: express.Application
    router: express.Router

    constructor (){
        this.app = express()
        this.routes()
        this.config()
        this.bootstrap()
    }

    config (): void{
        this.app.use(json())
        this.app.use(this.router)
    }

    routes (): void {        
        this.router = MainRouter.router
    }

    bootstrap (): void{
        this.app.listen(config.PORT, () => {
            console.log('Listening server on port ' + config.PORT + '...')
        })
    }

}

export default Server
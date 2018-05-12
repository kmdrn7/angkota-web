import * as express from 'express'

import dashboardController from '../controllers/dashboard.controller'
import homeController from '../controllers/home.controller';

class Router {

    router: express.Router
    
    constructor (){
        this.router = express.Router()
        this.routes()
    }

    routes (){
        this.router.use('/', homeController)
        
        this.router.get('/admin', (req: express.Request, res: express.Response) => {
            res.redirect('/dashboard')
        })

        this.router.use('/dashboard', dashboardController)
    }
}

export const router = new Router().router
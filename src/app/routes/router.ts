import * as express from 'express'

import dashboardController from '../controllers/dashboard.controller';
import homeController from '../controllers/home.controller';
import apiController from '../controllers/api.controller';
import socketController from '../controllers/socket.controller';
import authController from '../controllers/auth.controller';

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
        this.router.use('/socket', socketController)
        this.router.use('/auth', authController)
        this.router.use('/api/v1', apiController)
    }
}

export const router = new Router().router
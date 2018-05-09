import * as express from 'express'

import dashboardController from '../controllers/dashboard.controller';

class Router {

    router: express.Router
    
    constructor (){
        this.router = express.Router()
        this.routes()
    }

    routes (){
        this.router.get('/', (req, res) => {
            res.send("Cobak ganti")
        })
        
        this.router.use('/dashboard', dashboardController)        
    }
}

export const router = new Router().router
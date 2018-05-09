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
            res.render('index', {
                pengirim: "Andika Ahmad",
                pesan: {
                    header: "Tes",
                    body: "Halo ini adalah pesan dari saya",
                    foot: "hello"
                }                
            })
        })
        
        this.router.use('/dashboard', dashboardController)        
    }
}

export const router = new Router().router
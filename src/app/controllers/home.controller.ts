import { Router, Request, Response } from 'express'

class HomeController {
    
    router: Router

    constructor (){
        this.router = Router()
        this.routes()
    }

    routes (){
        this.router.get('/', (req: Request, res: Response) => {            
            res.render('welcome')
        })
    }

}

export default new HomeController().router
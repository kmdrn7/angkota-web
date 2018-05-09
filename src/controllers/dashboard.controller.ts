import { Router, Request, Response } from 'express';

class DashboardController {

    router: Router

    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            res.send("Percobaan penerapan framework laravel")
        })

        this.router.get('/:name', (req: Request, res: Response) => {
            console.log(req.params.name)            
        })

    }

}

export default new DashboardController().router;
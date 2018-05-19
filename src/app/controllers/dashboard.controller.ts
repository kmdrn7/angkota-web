import { Router, Request, Response } from 'express'

class DashboardController {

    router: Router

    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            res.render('index', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

        this.router.get('/test', (req: Request, res: Response) => {
            res.render('index', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

    }

}

export default new DashboardController().router
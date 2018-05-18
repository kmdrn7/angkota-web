import { Router, Request, Response } from 'express'
import {AdminPublicMessage as Admin} from '../socket/adminSocket'

class DashboardController {

    router: Router

    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            if(!req.session.email){
                res.redirect('auth/login');
            }else{
                res.render('index', {                
                    page: {
                        title: 'Dashboard',
                        actor: 'Jasa Raharja',
                        view: 'jasaraharja/dashboard'
                    }
                })
            }
        })
        
        this.router.get('/test', (req: Request, res: Response) => {
            res.json({"test":"yoi"})
            Admin.ioNameSpace.emit('messages', 'Ada Kecelakaan');
        })

    }

}

export default new DashboardController().router
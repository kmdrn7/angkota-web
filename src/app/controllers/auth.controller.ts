import { Router, Request, Response } from 'express'

class AuthController {
    
    router: Router

    constructor (){
        this.router = Router()
        this.routes()
    }

    routes (){
        this.router.get('/login', (req: Request, res: Response) => {
            if(!req.session.email){
                res.render('login/index');
            }else{
                res.redirect('/dashboard');
            }
        })
    }

}

export default new AuthController().router
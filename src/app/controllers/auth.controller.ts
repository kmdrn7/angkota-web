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

        this.router.post('/login', (req: Request, res: Response) => {
            if ( req.body.email == "admin@jasaraharja.com" && req.body.password == "asdfgvcxz" ){
                req.session.user = {
                    type: 'Jasa Raharja',
                    email: req.body.email,
                    actor: 'jasaraharja',
                    view: 'jasaraharja'
                }
                res.redirect('/dashboard')
            } else if ( req.body.email == "admin@kepolisian.com" && req.body.password == "asdfgvcxz" ){            
                req.session.user = {
                    type: 'Kepolisian',
                    email: req.body.email,
                    actor: 'kepolisian',
                    view: 'kepolisian'
                }
                res.redirect('/dashboard')
            } else if ( req.body.email == "admin@kesehatan.com" && req.body.password == "asdfgvcxz" ){
                req.session.user = {
                    type: 'Rumah Sakit',
                    email: req.body.email,
                    actor: 'kesehatan',
                    view: 'kesehatan'
                }                
                res.redirect('/dashboard')
            } else if ( req.body.email == "admin@terminal.com" && req.body.password == "asdfgvcxz" ){
                req.session.user = {
                    type: 'Terminal',
                    email: req.body.email,
                    actor: 'terminal',
                    view: 'terminal'
                }                
                res.redirect('/dashboard')
            } else {
                res.redirect('/auth/login')                
            }
        })

        this.router.get('/logout', (req: Request, res: Response) => {
            req.session.user = null
            res.redirect('/auth/login')
        })
    }

}

export default new AuthController().router
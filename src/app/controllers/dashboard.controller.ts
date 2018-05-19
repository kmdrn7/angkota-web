import { Router, Request, Response } from 'express'
import {AdminPublicMessage as Admin} from '../socket/adminSocket'
import {KepolisianSocket as KepolisianSocket} from '../socket/kepolisianSocket'
import * as admin from 'firebase-admin'

class DashboardController {

    router: Router

    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            
            req.session.user = {
                type: 'Kepolisian',
                email: 'aspendaka@gmail.com',
                actor: 'kepolisian',
                view: 'kepolisian'
            }

            if (!req.session.user){
                res.redirect('/auth/login');
            } else {
                if ( req.session.user.actor == 'jasaraharja' ){
                    res.redirect('/dashboard/jasaraharja')
                } else if ( req.session.user.actor == 'kepolisian' ){
                    res.redirect('/dashboard/kepolisian')
                } else if ( req.session.user.actor == 'kesehatan' ){
                    res.redirect('/dashboard/kesehatan')
                } else if ( req.session.user.actor == 'terminal' ){
                    res.redirect('/dashboard/terminal')
                } else {
                    res.json({
                        msg: "Halaman yang diminta tidak ada"
                    })
                }
            }
        })

        this.router.get('/jasaraharja', (req: Request, res: Response) => {
            if(!req.session.user){
                res.redirect('/auth/login');
            }else{
                res.render('jasaraharja/index', {
                    page: {
                        title: 'Dashboard',
                        actor: req.session.user.type,
                        view: req.session.user.view + '/dashboard',
                    }
                })
            }
        })

        this.router.get('/kepolisian', (req: Request, res: Response) => {
            if(!req.session.user){
                res.redirect('/auth/login');
            }else{
                res.render('kepolisian/index', {
                    page: {
                        title: 'Dashboard',
                        actor: req.session.user.type,
                        view: req.session.user.view + '/dashboard',
                    }
                })
            }
        })

        this.router.get('/kepolisian/report-accident', (req: Request, res: Response) => {

            req.session.user = {
                type: 'Kepolisian',
                email: 'aspendaka@gmail.com',
                actor: 'report-accident',
                view: 'report-accident'
            }

            if(!req.session.user){
                res.redirect('/auth/login');
            }else{
                
                admin.database().ref('report-accidents').once('value', (snap) => {                    
                    return snap
                }).then((ress) => {     
                    let itemArr = [];
                    ress.forEach(function(childSnapshot,id,arr){
                        // itemArr.push(childSnapshot.val())
                        admin.database().ref('/tickets').child(childSnapshot.key).once('value', (ticket) => {                    
                            return ticket
                        }).then((ticket) => {
                            let tmp = childSnapshot.val()
                            tmp.detailTicket = ticket.val()
                            itemArr.push(tmp)
                            console.log(arr)
                            // console.log(itemArr)
                            res.render('kepolisian/report-accident', {
                                page: {
                                    title: 'Dashboard',
                                    actor: req.session.user.type,
                                    view: req.session.user.view + '/dashboard',
                                }
                            })
                        })
                    });
                })


            }
        })

        this.router.get('/kesehatan', (req: Request, res: Response) => {
            if(!req.session.user){
                res.redirect('/auth/login');
            }else{
                res.render('index', {
                    page: {
                        title: 'Dashboard',
                        actor: req.session.user.type,
                        view: req.session.user.view + '/dashboard',
                    }
                })
            }
        })

        this.router.get('/terminal', (req: Request, res: Response) => {
            if(!req.session.user){
                res.redirect('/auth/login');
            }else{
                res.render('index', {
                    page: {
                        title: 'Dashboard',
                        actor: req.session.user.type,
                        view: req.session.user.view + '/dashboard',
                    }
                })
            }
        })
        
        this.router.get('/test', (req: Request, res: Response) => {
            res.json({"test":"yoi"})
            Admin.ioNameSpace.emit('messages', 'Ada Kecelakaan');
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
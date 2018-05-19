import { Router, Request, Response } from 'express'
import {fcmMessage as fcmMessage} from '../interfaces/fcmMessage'
import {NotificationController as Notif} from '../controllers/notification.controller'

class SocketController {

    router: Router
    pesan: fcmMessage = {title:"",body:"",icon:"",json:""}
    
    constructor (){
        this.router = Router()        
        this.routes()
    }

    routes (){
        
        this.router.get('/', (req: Request, res: Response) => {
            res.render('socket', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

        this.router.get('/test', (req: Request, res: Response) => {
            this.pesan.title = "tes"
            this.pesan.body = "tes"
            this.pesan.json = ""

            new Notif().sendMessage(this.pesan,"asdasd")

            res.render('socket', {                
                page: {
                    title: 'Dashboard',
                    actor: 'Jasa Raharja',
                    view: 'jasaraharja/dashboard'
                }
            })
        })

    }

}

export default new SocketController().router